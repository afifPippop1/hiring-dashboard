"use client";

import { submitApplicationAction } from "@/actions/application.action";
import { Button } from "@/components/ui/button";
import { useJob } from "@/hooks/use-job";
import {
  ApplicationFormField,
  ApplicationFormKey,
} from "@/lib/application_form/application-form.schema";
import { SUCCESS_APPLY_ASSET } from "@/lib/assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { EmptyState } from "../empty-state";
import { DateOfBirthForm } from "./date-of-birth-form";
import { DomicileForm } from "./domicile-form";
import { EmailForm } from "./email-form";
import { FullnameForm } from "./full-name-form";
import { GenderForm } from "./gender-form";
import { LinkedinLinkForm } from "./linkedin-link-form";
import { PhoneNumberForm } from "./phone-number-form";
import { PhotoProfileForm } from "./photo-profile-form";
import { Spinner } from "@/components/ui/spinner";

const ComponentByKey: Record<
  ApplicationFormKey,
  React.FC<{ required?: boolean }>
> = {
  full_name: FullnameForm,
  date_of_birth: DateOfBirthForm,
  phone_number: PhoneNumberForm,
  gender: GenderForm,
  domicile: DomicileForm,
  email: EmailForm,
  linkedin_link: LinkedinLinkForm,
  photo_profile: PhotoProfileForm,
};

function createSchema(fields: ApplicationFormField[]) {
  return z.object(
    fields.reduce((acc, field) => {
      const fieldType =
        field.key === "date_of_birth"
          ? z.date("Required")
          : field.key === "email"
          ? z.email("Please enter your email in the format: name@example.com")
          : z.string(
              field.key === "linkedin_link"
                ? "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username"
                : "Required"
            );

      const fieldValue = !field.validation.required
        ? fieldType.optional()
        : fieldType;
      return {
        ...acc,
        [field.key]: fieldValue,
      };
    }, {})
  );
}

export function ApplicationForm() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = useJob(jobId);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const schema = createSchema(job?.applicationFormArray || []);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const response = await submitApplicationAction({ ...data, jobId });
    if (!response.error) {
      setAppliedSuccess(true);
    }
  }

  if (job.isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-20 text-primary" />
      </div>
    );

  if (appliedSuccess) {
    return (
      <EmptyState
        src={SUCCESS_APPLY_ASSET}
        title="🎉Your application was sent!"
        description="Congratulation! You've taken the first step towards a rewarding career at Rakamin. We look foward to learning more about you during the application process."
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {job?.applicationFormArray?.map((field) => {
          const Component = ComponentByKey[field.key];
          return (
            <Component key={field.key} required={field.validation.required} />
          );
        })}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
