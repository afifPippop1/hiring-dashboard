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
import { useCreateJob } from "@/hooks/use-create-job";
import { APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE } from "@/lib/application_form/application-form-builder";
import {
  CURRENCY,
  JOB_STATUS,
  jobFormSchema,
  JobFormSchema,
} from "@/lib/job/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export function JobOpeningDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createJob = useCreateJob();
  const form = useForm<JobFormSchema>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      status: JOB_STATUS.Active,
      applicationsForm: APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE,
      currency: CURRENCY.IDR,
    },
  });
  async function onSubmit(formData: JobFormSchema) {
    const { error } = await createJob(formData);
    if (!error) {
      console.log(error);
    }
    form.reset();
    onOpenChange(false);
  }
  console.log(form.formState.errors);

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
