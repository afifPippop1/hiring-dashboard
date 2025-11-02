"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Input } from "@/components/ui/input";
import { Routes } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { signInAction } from "./action";
import { getSignInErrorMessage } from "./sign-in-error-message";
import { signInSchema, SignInSchema } from "./sign-in.schema";

export function SignInForm() {
  const queryClient = useQueryClient();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [formMessage, setFormMessage] = React.useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const router = useRouter();

  async function onSubmit(d: SignInSchema) {
    const { data, error } = await signInAction(d);
    setFormMessage({ success: !!data.user, error: error?.message });
    if (data.user) {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push(Routes.JobList);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-stretch gap-4">
          {formMessage?.error && (
            <Alert variant="destructive" className="text-center">
              <AlertTitle>
                {getSignInErrorMessage(formMessage.error)}
              </AlertTitle>
            </Alert>
          )}
          {formMessage?.success && (
            <Alert variant="success" className="text-center">
              <AlertTitle>
                Successfully signed in. redirecting to sign in ...
              </AlertTitle>
            </Alert>
          )}

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Alamat email</FieldLabel>
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
                <FieldLabel>Password</FieldLabel>
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
            loading={form.formState.isSubmitting}
          >
            Masuk
          </Button>

          <Divider text="atau" />

          <Button
            variant="outline"
            type="button"
            disabled={form.formState.isSubmitting}
          >
            <GoogleLogo />
            Masuk dengan Google
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
