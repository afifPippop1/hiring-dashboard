"use server";

import { ApplicationFormConverter } from "@/lib/application_form/application-form-converter";
import { JobMapper } from "@/lib/job/job-mapper";
import { JobFormSchema } from "@/lib/job/job.schema";
import { createClient } from "@/lib/supabase/server";

export async function createJob(formData: JobFormSchema) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user)
    return { data: null, error: { message: "Unauthorized" } };

  const normalizedApplicationFormData = ApplicationFormConverter.fromObject(
    formData.applicationsForm
  );
  const { data, error } = await supabase.from("jobs").insert({
    title: formData.title,
    descriptions: formData.descriptions,
    status: formData.status,
    candidate_needed: formData.candidateNeeded,
    applications_form: normalizedApplicationFormData,
    max_salary: formData.maxSalary,
    min_salary: formData.minSalary,
    type: formData.type,
    job_poster_id: user.data.user.id,
  });

  return { data, error };
}

export async function getJobList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id, title, descriptions, type, candidate_needed, salary_currency, min_salary, max_salary, status, created_at, updated_at"
    );
  if (error) {
    throw error;
  }
  const normalizedData = data.map((job) => JobMapper.fromSupabase(job));
  return normalizedData;
}

export async function getJob(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  const normalizedData = JobMapper.fromSupabase(data);
  return normalizedData;
}
