import { ApplicationFormConverter } from "../application_form/application-fomr-converter";
import { ApplicationFormFields } from "../application_form/application-form.schema";
import { Database } from "../supabase/database.types";
import { Job, JobStatus, JobType } from "./job.schema";

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];

export class JobMapper {
  static fromSupabase(row: SupabaseJob): Job {
    return {
      id: row.id,
      title: row.title,
      descriptions: row.descriptions,
      type: row.type as JobType,
      candidateNeeded: row.candidate_needed,
      minSalary: row.min_salary || undefined,
      maxSalary: row.max_salary || undefined,
      status: row.status as JobStatus,
      applicationsForm: ApplicationFormConverter.toObject(
        (row.applications_form ?? []) as ApplicationFormFields
      ),
      createdAt: row.created_at,
      updatedAt: row.updated_at || undefined,
    };
  }

  static toSupabase(job: Job): SupabaseJob {
    return {
      id: job.id,
      title: job.title,
      descriptions: job.descriptions,
      type: job.type,
      candidate_needed: job.candidateNeeded,
      min_salary: job.minSalary ?? null,
      max_salary: job.maxSalary ?? null,
      status: job.status,
      applications_form: ApplicationFormConverter.fromObject(
        job.applicationsForm
      ),
      created_at: job.createdAt,
      updated_at: job.updatedAt ?? null,
      job_poster_id: "",
      salary_currency: "IDR",
    };
  }
}
