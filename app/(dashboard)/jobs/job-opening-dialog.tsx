"use client";

import { JOB_TYPE, JobForm } from "@/components/shared/job-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const candidateFormSchema = z.object({
  full_name: z.string(),
  photo_profile: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  domicile: z.string(),
  email: z.email(),
  phone_number: z.string(),
  linkedin_link: z.string(),
  date_of_birth: z.date(),
});

type CandidateFormSchema = z.infer<typeof candidateFormSchema>;

const profileRequirements = z.array(
  z.object({
    key: z.string(),
    validation: z.object({
      required: z.boolean(),
    }),
  })
);

const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  descriptions: z.string().min(1, "Job description is required"),
  type: z.enum(JOB_TYPE, "Job type is required"),
  candidateNeeded: z
    .number("Minimum candidate is required")
    .min(1, "Minimum candidate is 1"),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  status: z.enum(["Active", "Inactive", "Draft"]),
  profileRequirements,
});

export type JobFormSchema = z.infer<typeof jobFormSchema>;

export function JobOpeningDialog({ children }: { children: ReactNode }) {
  const form = useForm<JobFormSchema>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      status: "Active",
      profileRequirements: [],
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {})}
            className="max-h-[80svh] flex flex-col"
          >
            <DialogHeader className="border-b border-b-neutral-40 p-4">
              <DialogTitle>Job Opening</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto px-4 py-4">
              <JobForm />
            </div>
            <DialogFooter className="border-t border-t-neutral-40 p-4">
              <Button type="submit">Publish Job</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
