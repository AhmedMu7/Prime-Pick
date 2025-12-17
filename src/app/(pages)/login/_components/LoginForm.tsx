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
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
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
});

export function LoginForm() {
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setisLoading(true);

    const response = await signIn("credentials", {
      callbackUrl: "/",
      redirect: true,
      email: data.email,
      password: data.password,
    });
    setisLoading(false);
  }

  return (
    <Card className="w-full sm:max-w-md dark:bg-gray-800">
      {/* <CardHeader>
        <CardTitle> Title</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader> */}
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  <p className="text-right text-gray-500 hover:cursor-pointer">Forget password?</p>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <Field >
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 hover:cursor-pointer"
            type="submit"
            form="form-rhf-demo"
          >
            {isLoading && <Loader2 className=" animate-spin" />}
            Submit
          </Button>
        </Field>
        <Field >
          <p className="text-center">Don&apos;t have an account ? <Link className=" font-bold text-gray-800 dark:text-white" href={'/signup'}>Sign Up</Link> </p> 
        </Field>
      </CardFooter>
    </Card>
  );

}
