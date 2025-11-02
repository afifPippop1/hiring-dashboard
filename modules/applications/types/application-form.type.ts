import z from "zod";
import { applicationFormSchema } from "../schema/application-form.schema";
import { APPLICATION_FORM_FIELD_OPTIONS } from "../constants";

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>;

export type ApplicationFormKey = keyof ApplicationFormSchema;

export type ApplicationFormAttributes = {
  key: ApplicationFormKey;
  label: string;
  value: ApplicationFormSchema[ApplicationFormKey];
  order: number;
};

export type ApplicationFormField = {
  key: ApplicationFormKey;
  validation: { required: boolean };
};

export type ApplicationFormFields = ApplicationFormField[];

export type ApplicationFormFieldOptionValue =
  (typeof APPLICATION_FORM_FIELD_OPTIONS)[keyof typeof APPLICATION_FORM_FIELD_OPTIONS];

export type ApplicationFormFieldOption = {
  value: ApplicationFormFieldOptionValue;
  selectable: boolean;
};
