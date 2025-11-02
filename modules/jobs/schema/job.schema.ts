import z from "zod";
import { applicationFormBuilderSchema } from "@/lib/application_form/application-form-builder";
import { JOB_STATUS_ENUM, JOB_TYPE_ENUM } from "../constants";

type JobType = (typeof JOB_TYPE_ENUM)[number];

// JOB STATUS
type JobStatus = (typeof JOB_STATUS_ENUM)[number];

const CURRENCY = {
  IDR: "IDR",
} as const;

type CurrencyType = (typeof CURRENCY)[keyof typeof CURRENCY];

// JOB FORM
const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  descriptions: z.string().min(1, "Job description is required"),
  type: z.enum(JOB_TYPE_ENUM, "Job type is required"),
  candidateNeeded: z
    .number("Minimum candidate is required")
    .min(1, "Minimum candidate is 1"),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  status: z.enum(JOB_STATUS_ENUM),
  currency: z.enum([CURRENCY.IDR]),
  applicationsForm: applicationFormBuilderSchema,
});

type JobFormSchema = z.infer<typeof jobFormSchema>;

type Job = Omit<JobFormSchema, "applicationsForm"> &
  Partial<Pick<JobFormSchema, "applicationsForm">> & {
    id: string;
    createdAt: string;
    updatedAt?: string;
  };

export { CURRENCY, JOB_STATUS_ENUM, jobFormSchema };

export type { CurrencyType, Job, JobFormSchema, JobStatus, JobType };
