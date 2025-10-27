import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { SignInForm } from "./sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex flex-col">
      <Logo />
      <Card className="w-[500px]">
        <CardContent className="flex flex-col gap-3">
          <section className="flex flex-col gap-2">
            <h1 className="text-heading-sm font-bold text-neutral-90">
              Masuk ke Rakamin
            </h1>
            <p>
              Belum punya akun?{" "}
              <Link href="/auth/sign-up" className="text-primary">
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
