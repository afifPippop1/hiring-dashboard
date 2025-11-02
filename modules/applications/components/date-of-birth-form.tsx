import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormSchema } from "../types";

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
              className={cn(
                "w-full justify-between font-normal h-9 bg-transparent text-sm text-neutral-60 hover:bg-transparent",
                open && "border-ring ring-ring/60 ring-[3px]"
              )}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <CalendarDays />
                <p className={field.value ? "text-neutral-90" : ""}>
                  {field.value
                    ? dayjs(field.value).format("DD MMMM YYYY")
                    : "Select date"}
                </p>
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
