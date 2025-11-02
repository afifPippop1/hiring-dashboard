import z from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter your email address"),
  password: z
    .string("Please enter your password")
    .min(1, "Please enter your password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
