import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormSchema } from "../types";

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
