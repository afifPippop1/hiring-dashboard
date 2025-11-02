import z from "zod";

export const signUpSchema = z.object({
  email: z.email("Please enter valid email address"),
  password: z
    .string("Please enter password")
    .min(8, "Password need to be at least 8 characters long"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
