import z from "zod";
import { FIELD_OPTIONS } from "../constants";
import { ApplicationFormKey } from "../types";
import { applicationFormSchema } from "./application-form.schema";

export const fieldsShape = Object.fromEntries(
  (Object.keys(applicationFormSchema.shape) as ApplicationFormKey[]).map(
    (key) => [key, FIELD_OPTIONS]
  )
) as Record<ApplicationFormKey, typeof FIELD_OPTIONS>;

export const applicationFormBuilderSchema = z.object(fieldsShape);
