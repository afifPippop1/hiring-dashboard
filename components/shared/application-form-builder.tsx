"use client";

import {
  APPLICATION_FORM_FIELDS_BUILDER_OPTIONS,
  ApplicationFormFieldOption,
} from "@/lib/application_form/application-form-builder";
import { ApplicationFormKey } from "@/lib/application_form/application-form.schema";
import { JobFormSchema } from "@/lib/job/job.schema";
import { Controller, useFormContext } from "react-hook-form";
import Chip from "../ui/chip";

export function ApplicationFormBuilder() {
  return (
    <div className="p-4 border border-neutral-30 rounded-[8px]">
      <h3 className="text-md font-bold">
        Minimum Profile Information Required
      </h3>
      <section className="p-2">
        {APPLICATION_FORM_FIELDS_BUILDER_OPTIONS.map((item) => (
          <ApplicationFormBuilderItem
            key={item.field}
            field={item.field}
            label={item.label}
            options={item.options}
          />
        ))}
      </section>
    </div>
  );
}

function ApplicationFormBuilderItem(props: {
  field: ApplicationFormKey;
  label: string;
  options: ApplicationFormFieldOption[];
}) {
  const { control } = useFormContext<JobFormSchema>();
  return (
    <Controller
      control={control}
      name={`applicationsForm.${props.field}`}
      render={({ field }) => (
        <div className="px-2 py-3 flex justify-between items-center">
          <p className="text-md text-neutral-90">{props.label}</p>
          <div className="flex items-center gap-2">
            {props.options.map((option) => (
              <Chip
                key={option.value}
                active={option.value === field.value}
                disabled={!option.selectable}
                onClick={() => field.onChange(option.value)}
              >
                {option.value}
              </Chip>
            ))}
          </div>
        </div>
      )}
    />
  );
}
