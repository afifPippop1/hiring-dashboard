"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
            <Input placeholder="Ex. 2" />
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
}
