"use server";

import { createClient } from "@/lib/supabase/server";
import { SignInSchema } from "@/schema/sign-in.schema";

export async function signInAction({ email, password }: SignInSchema) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}
