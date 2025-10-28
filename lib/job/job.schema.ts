import z from "zod";
import { applicationFormBuilderSchema } from "../application_form/application-form-builder";

// JOB TYPE
const JOB_TYPE = {
  Fulltime: "Full-time",
  Contract: "Contract",
  Parttime: "Part-time",
  Internship: "Internship",
  Freelance: "Freelance",
} as const;

const JOB_TYPE_ENUM = [
  JOB_TYPE.Fulltime,
  JOB_TYPE.Contract,
  JOB_TYPE.Parttime,
  JOB_TYPE.Internship,
  JOB_TYPE.Freelance,
] as const;
type JobType = (typeof JOB_TYPE_ENUM)[number];

// JOB STATUS
const JOB_STATUS = {
  Active: "Active",
  Inactive: "Inactive",
  Draft: "Draft",
} as const;
const JOB_STATUS_ENUM = [
  JOB_STATUS.Active,
  JOB_STATUS.Inactive,
  JOB_STATUS.Draft,
] as const;
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

export {
  JOB_TYPE,
  JOB_TYPE_ENUM,
  JOB_STATUS,
  JOB_STATUS_ENUM,
  jobFormSchema,
  CURRENCY,
};

export type { JobFormSchema, JobType, JobStatus, Job, CurrencyType };
