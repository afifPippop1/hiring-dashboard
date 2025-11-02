"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Divider } from "@/components/ui/divider";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupNumberInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationForm } from "@/modules/jobs/components/admin/application-form-builder";
import { JOB_TYPE_ENUM, JobFormSchema } from "@/modules/jobs";

export function JobForm() {
  const { control } = useFormContext<JobFormSchema>();
  return (
    <div className="flex flex-col items-stretch gap-4">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel required>Job Name</FieldLabel>
            <Input placeholder="Ex. Front End Engineer" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="type"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel required>Job Type</FieldLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPE_ENUM.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="descriptions"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel required>Job Description</FieldLabel>
            <Textarea placeholder="Explain job description" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="candidateNeeded"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel required>Number of Candidate Needed</FieldLabel>
            <NumberInput
              placeholder="Ex. 2"
              thousandSeparator="."
              decimalSeparator=","
              onValueChange={(values) => {
                field.onChange(values.floatValue);
              }}
              value={field.value}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Divider className="border-dashed border-neutral-40" />

      <Label>Job Salary</Label>
      <div className="flex gap-4">
        <Controller
          control={control}
          name="minSalary"
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel>Minimum Estimated Salary</FieldLabel>
              <InputGroup>
                <InputGroupNumberInput
                  min="0"
                  value={field.value || ""}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                />
                <InputGroupAddon>
                  <p className="text-neutral-90">Rp</p>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="maxSalary"
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel>Maximum Estimated Salary</FieldLabel>
              <InputGroup>
                <InputGroupNumberInput
                  min="0"
                  value={field.value || ""}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                />
                <InputGroupAddon>
                  <p className="text-neutral-90">Rp</p>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <ApplicationForm />
    </div>
  );
}
