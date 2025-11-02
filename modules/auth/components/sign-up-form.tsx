"use client";

import { signUpAction } from "@/actions/sign-up.action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Input } from "@/components/ui/input";
import { Routes } from "@/lib/routes";
import { signUpSchema, SignUpSchema } from "../schema/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
    <FormProvider {...form}>
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

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Alamat email</FieldLabel>
                <Input type="email" placeholder="Email address" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Password</FieldLabel>
                <Input placeholder="Password" type="password" {...field} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
    </FormProvider>
  );
}
