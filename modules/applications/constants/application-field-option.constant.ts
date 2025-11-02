import z from "zod";
import { APPLICATION_FORM_FIELD_OPTIONS } from "./application-form-field-option.constant";

export const FIELD_OPTIONS = z.enum([
  APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
  APPLICATION_FORM_FIELD_OPTIONS.Optional,
  APPLICATION_FORM_FIELD_OPTIONS.Off,
] as const);
