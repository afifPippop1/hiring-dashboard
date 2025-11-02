import { ApplicationFormFieldOption, ApplicationFormKey } from "../types";
import { APPLICATION_FORM_FIELD_OPTIONS } from "./application-form-field-option.constant";

export const APPLICATION_FORM_FIELDS_BUILDER_OPTIONS: {
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
