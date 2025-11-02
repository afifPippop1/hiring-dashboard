"use server";

import { createClient } from "@/lib/supabase/server";
import { SignUpSchema } from "@/schema/sign-up.schema";

export async function signUpAction({ email, password }: SignUpSchema) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}
