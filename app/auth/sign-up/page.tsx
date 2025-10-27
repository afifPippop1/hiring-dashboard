import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { SignUpForm } from "./sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col">
      <Logo />
      <Card className="w-[500px]">
        <CardContent className="flex flex-col gap-3">
          <section className="flex flex-col gap-2">
            <h1 className="text-heading-sm font-bold text-neutral-90">
              Bergabung dengan Rakamin
            </h1>
            <p>
              Sudah punya akun?{" "}
              <Link href="/auth/sign-in" className="text-primary">
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
