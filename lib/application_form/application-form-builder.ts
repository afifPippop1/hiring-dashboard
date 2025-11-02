import z from "zod";
import {
  ApplicationFormKey,
  applicationFormSchema,
} from "./application-form.schema";

const APPLICATION_FORM_FIELD_OPTIONS = {
  Mandatory: "Mandatory",
  Optional: "Optional",
  Off: "Off",
} as const;

type ApplicationFormFieldOptionValue =
  (typeof APPLICATION_FORM_FIELD_OPTIONS)[keyof typeof APPLICATION_FORM_FIELD_OPTIONS];

type ApplicationFormFieldOption = {
  value: ApplicationFormFieldOptionValue;
  selectable: boolean;
};

const APPLICATION_FORM_FIELDS_BUILDER_OPTIONS: {
  field: ApplicationFormKey;
  label: string;
  options: ApplicationFormFieldOption[];
}[] = [
  {
    field: "full_name",
    label: "Full name",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: false },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "photo_profile",
    label: "Photo Profile",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: false },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "gender",
    label: "Gender",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "domicile",
    label: "Domicile",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "email",
    label: "Email",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: false },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "phone_number",
    label: "Phone number",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "linkedin_link",
    label: "Linkedin link",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "date_of_birth",
    label: "Date of birth",
    options: [
      { value: APPLICATION_FORM_FIELD_OPTIONS.Mandatory, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Optional, selectable: true },
      { value: APPLICATION_FORM_FIELD_OPTIONS.Off, selectable: true },
    ],
  },
] as const;

const FIELD_OPTIONS = z.enum([
  APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
  APPLICATION_FORM_FIELD_OPTIONS.Optional,
  APPLICATION_FORM_FIELD_OPTIONS.Off,
] as const);

const fieldsShape = Object.fromEntries(
  (Object.keys(applicationFormSchema.shape) as ApplicationFormKey[]).map(
    (key) => [key, FIELD_OPTIONS]
  )
) as Record<ApplicationFormKey, typeof FIELD_OPTIONS>;

const applicationFormBuilderSchema = z.object(fieldsShape);

type ApplicationFormBuilderSchema = z.infer<
  typeof applicationFormBuilderSchema
>;

const APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE: ApplicationFormBuilderSchema =
  {
    photo_profile: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    full_name: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    email: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    gender: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    date_of_birth: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    domicile: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    phone_number: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
    linkedin_link: APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
  } as const;

export {
  APPLICATION_FORM_FIELD_OPTIONS,
  APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE,
  APPLICATION_FORM_FIELDS_BUILDER_OPTIONS,
  applicationFormBuilderSchema,
};

export type {
  ApplicationFormBuilderSchema,
  ApplicationFormFieldOption,
  ApplicationFormFieldOptionValue,
};
