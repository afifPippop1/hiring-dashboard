import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormSchema } from "../types";

export function GenderForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="gender"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Pronoun (gender)</FieldLabel>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            onBlur={field.onBlur}
            className="flex gap-6 items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="Female" />
              <Label htmlFor="Female">She/her (Female)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="Male" />
              <Label htmlFor="Male">He/him (Male)</Label>
            </div>
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
