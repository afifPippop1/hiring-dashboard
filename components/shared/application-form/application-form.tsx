"use client";

import { submitApplicationAction } from "@/actions/application.action";
import { Button } from "@/components/ui/button";
import { useJob } from "@/hooks/use-job";
import {
  ApplicationFormKey,
  ApplicationFormSchema,
} from "@/lib/application_form/application-form.schema";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DateOfBirthForm } from "./date-of-birth-form";
import { DomicileForm } from "./domicile-form";
import { EmailForm } from "./email-form";
import { FullnameForm } from "./full-name-form";
import { GenderForm } from "./gender-form";
import { LinkedinLinkForm } from "./linkedin-link-form";
import { PhoneNumberForm } from "./phone-number-form";
import { PhotoProfileForm } from "./photo-profile-form";

const ComponentByKey: Record<ApplicationFormKey, React.FC> = {
  full_name: FullnameForm,
  date_of_birth: DateOfBirthForm,
  phone_number: PhoneNumberForm,
  gender: GenderForm,
  domicile: DomicileForm,
  email: EmailForm,
  linkedin_link: LinkedinLinkForm,
  photo_profile: PhotoProfileForm,
};

export function ApplicationForm() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = useJob(jobId);
  const form = useForm<ApplicationFormSchema>({
    defaultValues: {
      full_name: "",
      domicile: "",
    },
  });

  async function onSubmit(data: ApplicationFormSchema) {
    const response = await submitApplicationAction({ ...data, jobId });
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {job?.applicationFormArray?.map((field) => {
          const Component = ComponentByKey[field.key];
          return <Component key={field.key} />;
        })}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
