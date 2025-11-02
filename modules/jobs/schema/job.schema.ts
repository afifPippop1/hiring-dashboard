import { applicationFormBuilderSchema } from "@/lib/application_form/application-form-builder";
import z from "zod";
import { CURRENCY, JOB_STATUS_ENUM, JOB_TYPE_ENUM } from "../constants";

export const jobFormSchema = z.object({
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
