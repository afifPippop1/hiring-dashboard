"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Divider } from "../ui/divider";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupNumberInput,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { NumberInput } from "../ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { FormDataChecklist } from "./form-data-checklist";

const JOB_TYPE = [
  "Full-time",
  "Contract",
  "Part-time",
  "Internship",
  "Freelance",
] as const;

const jobFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(JOB_TYPE),
  numberOfCandidate: z.number(),
  minSalary: z.number(),
  maxSalary: z.number(),
});

type JobFormSchema = z.infer<typeof jobFormSchema>;

export function JobForm() {
  const form = useForm<JobFormSchema>({
    resolver: zodResolver(jobFormSchema),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col items-stretch gap-4">
        <FormItem>
          <FormLabel required>Job Name</FormLabel>
          <FormControl>
            <Input placeholder="Ex. Front End Engineer" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel required>Job Type</FormLabel>
          <FormControl>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel required>Job Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Ex. Front End Engineer" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel required>Number of Candidate Needed</FormLabel>
          <FormControl>
            <NumberInput
              placeholder="Ex. 2"
              thousandSeparator="."
              decimalSeparator=","
            />
          </FormControl>
        </FormItem>

        <Divider className="border-dashed border-neutral-40" />

        <Label>Job Salary</Label>
        <div className="flex gap-4">
          <FormItem className="flex-1">
            <FormLabel>Minimum Estimated Salary</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupNumberInput min="0" />
                <InputGroupAddon>
                  <p className="text-neutral-90">Rp</p>
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
          </FormItem>
          <FormItem className="flex-1">
            <FormLabel>Minimum Estimated Salary</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupNumberInput min="0" />
                <InputGroupAddon>
                  <p className="text-neutral-90">Rp</p>
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
          </FormItem>
        </div>

        <FormDataChecklist />
      </form>
    </Form>
  );
}
