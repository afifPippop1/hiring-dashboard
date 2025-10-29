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

export function ApplicationForm() {
  const form = useForm<ApplicationFormSchema>({
    defaultValues: {
      full_name: "",
    },
  });
  function onSubmit(data: ApplicationFormSchema) {
    console.log(data);
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
