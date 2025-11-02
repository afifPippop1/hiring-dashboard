import z from "zod";
import { applicationFormBuilderSchema } from "../schema/application-form-builder.schema";

export type ApplicationFormBuilderSchema = z.infer<
  typeof applicationFormBuilderSchema
>;
