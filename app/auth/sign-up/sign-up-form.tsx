"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "./sign-up.schema";
import { signUpAction } from "./sign-up.action";
import { useRouter } from "next/navigation";
import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Routes } from "@/lib/routes";
import { SignUpErrorMessage } from "./sign-up-error-message";

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [formMessage, setFormMessage] = React.useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  async function onSubmit(d: SignUpSchema) {
    const { data, error } = await signUpAction(d);
    setFormMessage({ success: !!data.user, error: error?.message });
    if (data.user) {
      router.push(Routes.SignIn);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-stretch gap-4">
          {formMessage?.error && (
            <Alert variant="destructive" className="text-center">
              <AlertTitle>
                <SignUpErrorMessage message={formMessage.error} />
              </AlertTitle>
            </Alert>
          )}

          {formMessage?.success && (
            <Alert variant="success">
              <AlertTitle>
                Successfully register. redirect to sign in
              </AlertTitle>
            </Alert>
          )}
          <FormItem>
            <FormLabel>Alamat email</FormLabel>
            <FormControl autoFocus>
              <Input {...form.register("email")} />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...form.register("password")} type="password" />
            </FormControl>
          </FormItem>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Daftar dengan email
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="flex-1 border-b border-neutral-60" />
            <p className="text-sm text-neutral-60">or</p>
            <span className="flex-1 border-b border-neutral-60" />
          </div>

          <Button
            variant="outline"
            type="button"
            disabled={form.formState.isSubmitting}
          >
            <GoogleLogo />
            Daftar dengan Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
