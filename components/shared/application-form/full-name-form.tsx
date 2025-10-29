import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { Controller, useFormContext } from "react-hook-form";

export function FullnameForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="full_name"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Full name</FieldLabel>
          <Input placeholder="Enter your full name" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
