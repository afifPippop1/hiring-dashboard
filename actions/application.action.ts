"use server";

import { applicationFormMapper } from "@/lib/application_form/application-form-mapper";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { createClient } from "@/lib/supabase/server";

export async function submitApplicationAction({
  jobId,
  ...formData
}: ApplicationFormSchema & { jobId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("applications").insert({
    job_id: jobId,
    attributes: applicationFormMapper(formData),
  });
  return { data, error };
}
