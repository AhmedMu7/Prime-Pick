import { FailedLogin, SuccessLogin } from "@/interfaces/Login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credential",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload : SuccessLogin | FailedLogin = await response.json();

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message);
        }
      },
    }),
  ],
  callbacks:{

    jwt:({token , user}) => {

        if(user){
            token.user = user.user;
            token.token = user.token;
        }

        return token
    },
    session:({session , token}) => {

        session.user = token.user;
        session.token = token.token;

        return session;
    }
  },
  pages:{
    error:'/login'
  }
});

export { handler as GET, handler as POST };
