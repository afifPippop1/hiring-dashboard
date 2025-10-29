"use client";

import { FormProvider, useForm } from "react-hook-form";
import { PhotoProfileForm } from "./photo-profile-form";
import { FullnameForm } from "./full-name-form";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { GenderForm } from "./gender-form";
import { EmailForm } from "./email-form";
import { LinkedinLinkForm } from "./linkedin-link-form";
import { Button } from "@/components/ui/button";
import { DateOfBirthForm } from "./date-of-birth-form";
import { PhoneNumberForm } from "./phone-number-form";
import { DomicileForm } from "./domicile-form";
import { useParams } from "next/navigation";
import { submitApplicationAction } from "@/actions/application.action";

export function ApplicationForm() {
  const { jobId } = useParams<{ jobId: string }>();
  const form = useForm<ApplicationFormSchema>({
    defaultValues: {
      full_name: "",
      domicile: "",
    },
  });
  async function onSubmit(data: ApplicationFormSchema) {
    const response = await submitApplicationAction({ ...data, jobId });
    console.log(response);
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PhotoProfileForm />
        <FullnameForm />
        <DateOfBirthForm />
        <PhoneNumberForm />
        <GenderForm />
        <DomicileForm />
        <EmailForm />
        <LinkedinLinkForm />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
