import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { Controller, useFormContext } from "react-hook-form";

export function LinkedinLinkForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="linkedin_link"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Link Linkedin</FieldLabel>
          <Input placeholder="https://linkedin.com/in/username" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
