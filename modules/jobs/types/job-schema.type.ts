import z from "zod";
import { jobFormSchema } from "../schema";

export type JobFormSchema = z.infer<typeof jobFormSchema>;
