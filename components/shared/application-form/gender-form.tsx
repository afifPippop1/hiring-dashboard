import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { Controller, useFormContext } from "react-hook-form";

export function GenderForm({ required }: { required?: boolean }) {
  console.log(required);
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="gender"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Pronoun (gender)</FieldLabel>
          <RadioGroup
            onChange={field.onChange}
            value={field.value}
            onBlur={field.onBlur}
            className="flex gap-6 items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" />
              <Label>She/her (Female)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" />
              <Label>He/him (Male)</Label>
            </div>
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
