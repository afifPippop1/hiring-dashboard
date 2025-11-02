import { ApplicationFormBuilderSchema } from "../types";
import { APPLICATION_FORM_FIELD_OPTIONS } from "./application-form-field-option.constant";

export const APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE: ApplicationFormBuilderSchema =
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
