"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import {
  SignUpSchema,
  SignUpSchemaType
} from "@/modules/auth/schemas/sign-up";
import { SignUp } from "@/modules/auth/actions/sign-up";

export const SignUpForm = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: SignUpSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      SignUp(value)
        .then(({ success, error }) => {
          if (success) {
            setSuccess(success);
            form.reset();
          }

          if (error) setError(error);
        });
    });
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField 
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-[#787774]">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="John Doe"
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-[#787774]">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john.doe@example.com"
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-[#787774]">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1">
          <FormSuccess message={success} />
          <FormError message={error} />
          <div className="text-[#acaba9] text-xs flex text-left">
            Use an organization email to easily collaborate with teammates
          </div>
        </div>
        <Button className="w-full" variant="primary" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
}