"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormLabel } from "@/components/ui/form";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignInSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-stretch gap-4">
          <section className="flex flex-col gap-2">
            <FormLabel>Alamat email</FormLabel>
            <FormControl autoFocus>
              <Input {...form.register("email")} />
            </FormControl>
          </section>

          <section className="flex flex-col gap-2">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...form.register("password")} type="password" />
            </FormControl>
          </section>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            type="submit"
          >
            Daftar dengan email
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="flex-1 border-b border-neutral-60" />
            <p className="text-sm text-neutral-60">or</p>
            <span className="flex-1 border-b border-neutral-60" />
          </div>

          <Button variant="outline" type="button">
            <GoogleLogo />
            Daftar dengan Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
