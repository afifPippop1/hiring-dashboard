import { CurrencyType, Job, JobStatus, JobType } from "@/modules/jobs";
import { ApplicationFormConverter } from "../application_form/application-form-converter";
import { ApplicationFormFields } from "../application_form/application-form.schema";
import { Database } from "../supabase/types";

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];

export class JobMapper {
  static fromSupabase(row: Partial<SupabaseJob>): Job {
    const dto: Job = {
      id: row.id ?? "",
      title: row.title ?? "",
      descriptions: row.descriptions ?? "",
      type: row.type as JobType,
      candidateNeeded: row.candidate_needed ?? 0,
      minSalary: row.min_salary ?? undefined,
      maxSalary: row.max_salary ?? undefined,
      currency: row.salary_currency as CurrencyType,
      status: row.status as JobStatus,
      createdAt: row.created_at ?? "",
      updatedAt: row.updated_at || undefined,
    };

    if (row.applications_form) {
      dto.applicationsForm = ApplicationFormConverter.toObject(
        (row.applications_form ?? []) as ApplicationFormFields
      );
    }

    return dto;
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
      applications_form: job.applicationsForm
        ? ApplicationFormConverter.fromObject(job.applicationsForm)
        : [],
      created_at: job.createdAt,
      updated_at: job.updatedAt ?? null,
      job_poster_id: "",
      salary_currency: job.currency,
    };
  }
}
