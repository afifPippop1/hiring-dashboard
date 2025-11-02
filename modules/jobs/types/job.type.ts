import { JobFormSchema } from "./job-schema.type";

export type Job = Omit<JobFormSchema, "applicationsForm"> &
  Partial<Pick<JobFormSchema, "applicationsForm">> & {
    id: string;
    createdAt: string;
    updatedAt?: string;
  };
