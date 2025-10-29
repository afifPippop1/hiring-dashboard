import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function PhoneNumberForm() {
  const { control } = useFormContext<ApplicationFormSchema>();
  return (
    <Controller
      control={control}
      name="phone_number"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required>Phone number</FieldLabel>
          <PhoneInput
            country="id"
            enableSearch
            value={field.value}
            onChange={field.onChange}
            placeholder="81XXXXXXXXX"
            inputClass="!w-full !h-[42px] !rounded-md !border !border-neutral-300 !bg-white !text-neutral-900 focus:!border-primary focus:!ring-2 focus:!ring-primary/20 !font-sans !text-md !px-3 !pl-20 placeholder:!text-neutral-400"
            buttonClass="!rounded-l-md !px-4 !py-3 !border !border-r !border-neutral-40 hover:!border-primary focus:!border-primary focus:!ring-2 focus:!ring-primary/20 !bg-neutral-10"
            dropdownClass="!rounded-md !shadow-lg !border !border-neutral-200 !bg-white !font-sans [&_li:hover]:!bg-primary-surface !z-50 !mt-2"
            searchClass="!border !border-neutral-200 !rounded-md !px-2 !py-1 !mb-2 !font-sans focus:!border-primary focus:!ring-1 focus:!ring-primary/20"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
