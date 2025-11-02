import { Routes } from "@/lib/routes";
import Link from "next/link";
import { ReactNode } from "react";

export function SignUpErrorMessage({
  message,
}: {
  message: string;
}): ReactNode {
  if (message === "User already registered") {
    return (
      <p>
        Email ini sudah terdaftar sebagai akun di Rakamin Academy.{" "}
        <Link href={Routes.SignIn} className="text-danger font-bold">
          Masuk
        </Link>
      </p>
    );
  }
  return message;
}
