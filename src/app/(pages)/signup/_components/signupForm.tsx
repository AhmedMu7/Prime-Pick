"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Loader2, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FailedSignUp, SuccessSignUp } from "@/interfaces/SignUp";


const formSchema = z.object({

 name:z
 .string()
 .nonempty("Name is Required")
 .min(3,"Name must be at least 3 characters"),


  email: z
    .string()
    .nonempty("Email is Required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not Valid"
    ),
  password: z
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password is not valid"
    ),
  repassword: z
    .string()
    .nonempty("rePassword is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  phone: z
    .string()
    .nonempty("Phone is Required")
    .regex(
      /^(\+20|0)(1[0125])[0-9]{8}$/,
      "Phone must be a valid Egyptian number (e.g., +201001234567 or 01001234567)"
    ),
  
}).refine((data) => data.password === data.repassword, {
  message: "Passwords don't match",
  path: ["repassword"], // This sets which field the error appears on
});

export function SignUpForm() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [signInError, setSignInError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setisLoading(true);

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup" , {

        method:"POST",
        body : JSON.stringify({

        name : data.name,
        email : data.email,
        password : data.password,
        rePassword : data.repassword,
        phone : data.phone

        }),

        headers : {

            "Content-Type" : "application/json"

        }


    })

    const payload : SuccessSignUp | FailedSignUp = await response.json()

    if("token" in payload){

        router.push('/login')
    }
    else{

        setSignInError(payload.message)
    }


    setisLoading(false);

  }

  return (
    <Card className="w-full sm:max-w-md dark:bg-gray-800">
      {/* <CardHeader>
        <CardTitle className="font-bold text-2xl text-center"> Creat Account</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader> */}
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    autoComplete="off"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="repassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-repassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-repassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm Your Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Phone (e.g., +201001234567)"
                    autoComplete="off"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <Field className="w-full">
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 hover:cursor-pointer"
            type="submit"
            form="form-rhf-demo"
          >
            {isLoading && <Loader2 className=" animate-spin mr-2" />}
            Create an account
          </Button>
        </Field>

        {signInError && (
          <Field>
            <p className="text-destructive text-center">{signInError}</p>
          </Field>
        )}

        <Field>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="font-bold text-gray-800 dark:text-white" href={'/login'}>
              Log In
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
