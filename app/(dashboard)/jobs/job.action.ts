"use server";

import { ApplicationFormConverter } from "@/lib/application_form/application-fomr-converter";
import { JobFormSchema } from "@/lib/job/job.schema";
import { createClient } from "@/lib/supabase/server";

export async function createJob(formData: JobFormSchema) {
  const supabase = await createClient();
  const normalizedApplicationFormData = ApplicationFormConverter.fromObject(
    formData.applicationsForm
  );
  const { data, error } = await supabase.from("jobs").insert({});

  return { data, error };
}
