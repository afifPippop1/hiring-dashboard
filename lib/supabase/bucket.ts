import { createClient } from "@supabase/supabase-js";
// Create Supabase client
export const supabaseBucket = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
