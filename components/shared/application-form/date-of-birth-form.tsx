import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export function DateOfBirthForm() {
  const { control } = useFormContext<ApplicationFormSchema>();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <Controller
      control={control}
      name="date_of_birth"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required>Date of birth</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-48 justify-between font-normal"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 1 }}
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
