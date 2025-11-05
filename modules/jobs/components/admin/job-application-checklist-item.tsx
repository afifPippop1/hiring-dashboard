import {
  ApplicationFormFieldOption,
  ApplicationFormKey,
} from "@/modules/applications";
import { Controller, useFormContext } from "react-hook-form";
import { JobFormSchema } from "../../types";
import Chip from "@/components/ui/chip";

export function JobApplicationChecklistItem(props: {
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
