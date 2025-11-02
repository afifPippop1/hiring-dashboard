import { SignInForm } from "@/components/shared/forms/sign-in/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Routes } from "@/lib/routes";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6">
      <Logo />
      <Card className="w-[500px]">
        <CardContent className="flex flex-col gap-3">
          <section className="flex flex-col gap-2">
            <h1 className="text-heading-sm font-bold text-neutral-90">
              Masuk ke Rakamin
            </h1>
            <p>
              Belum punya akun?{" "}
              <Link href={Routes.SignUp} className="text-primary">
                Daftar menggunakan email
              </Link>
            </p>
          </section>

          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
