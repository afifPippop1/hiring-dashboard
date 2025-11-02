import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ApplicationFormSchema } from "../types";

export function PhoneNumberForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="phone_number"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Phone number</FieldLabel>
          <PhoneInput
            country="id"
            enableSearch
            value={field.value}
            onChange={field.onChange}
            placeholder="81XXXXXXXXX"
            inputClass="w-full! h-9! rounded-md! border! border-input! bg-transparent! text-foreground! focus:border-ring! focus:ring-[3px]! focus:ring-ring/60! font-sans! text-sm! px-3! pl-20! placeholder:text-neutral-400!"
            buttonClass="rounded-l-md! px-4! py-3! border! border-r! border-input! hover:border-ring! focus:border-ring! focus:ring-[3px]! focus:ring-ring/60! bg-transparent!"
            dropdownClass="rounded-md! shadow-lg! border! border-input! bg-neutral-10! font-sans! [&_li:hover]:bg-primary-surface! z-50! mt-2! [&>li:first-child]:p-2! [&>li:first-child]:border-0! [&>li:first-child]:flex! [&>li:first-child>input]:flex-1! [&>li:first-child>span]:w-max! [&>li:first-child]:gap-2!"
            searchClass="border! w-full border-input! rounded-md! px-2! py-1! font-sans! focus:border-primary-border! focus:ring-[3px]! focus:ring-primary-border/60! focus:shadow-none ml-0! mb-0! text-sm!"
            disableSearchIcon
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
