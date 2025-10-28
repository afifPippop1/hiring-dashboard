"use client";

import { JobForm } from "@/components/shared/job-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationFormConverter } from "@/lib/application_form/application-fomr-converter";
import { APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE } from "@/lib/application_form/application-form-builder";
import { JOB_STATUS, jobFormSchema, JobFormSchema } from "@/lib/job/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createJob } from "./job.action";

export function JobOpeningDialog({ children }: { children: ReactNode }) {
  const form = useForm<JobFormSchema>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      status: JOB_STATUS.Active,
      applicationsForm: APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE,
    },
  });
  async function onSubmit(formData: JobFormSchema) {
    const { data, error } = await createJob(formData);
    console.log({ data, error });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-[80svh] flex flex-col"
          >
            <DialogHeader className="border-b border-b-neutral-40 p-4">
              <DialogTitle>Job Opening</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto px-4 py-4">
              <JobForm />
            </div>
            <DialogFooter className="border-t border-t-neutral-40 p-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Publish Job
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
