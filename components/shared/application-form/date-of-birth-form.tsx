import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import dayjs from "dayjs";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export function DateOfBirthForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name="date_of_birth"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Date of birth</FieldLabel>
          <div className="flex">
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <CalendarDays />
                {field.value
                  ? dayjs(field.value).format("DD MMMM YYYY")
                  : "Select date"}
              </div>
              <ChevronDownIcon />
            </Button>
            <DatePicker
              isOpen={open}
              onChange={(value) => {
                field.onChange(value);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
              value={field.value}
            />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
