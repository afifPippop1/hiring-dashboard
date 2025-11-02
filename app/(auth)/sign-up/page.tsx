import { SignUpForm } from "@/components/shared/forms/sign-up/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Routes } from "@/lib/routes";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6">
      <Logo />
      <Card className="w-[500px]">
        <CardContent className="flex flex-col gap-3">
          <section className="flex flex-col gap-2">
            <h1 className="text-heading-sm font-bold text-neutral-90">
              Bergabung dengan Rakamin
            </h1>
            <p>
              Sudah punya akun?{" "}
              <Link href={Routes.SignIn} className="text-primary">
                Masuk
              </Link>
            </p>
          </section>

          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
