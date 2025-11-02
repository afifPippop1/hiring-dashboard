import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormSchema } from "../types";

export function EmailForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="email"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Email</FieldLabel>
          <Input placeholder="Enter your email address" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
