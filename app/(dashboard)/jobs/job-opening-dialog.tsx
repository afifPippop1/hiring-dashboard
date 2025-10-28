"use client";

import { JobForm } from "@/components/shared/job-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE } from "@/lib/application_form/application-form-builder";
import { JOB_STATUS, jobFormSchema, JobFormSchema } from "@/lib/job/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createJob } from "../../../actions/job.action";

export function JobOpeningDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
    const { error } = await createJob(formData);
    if (!error) {
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
