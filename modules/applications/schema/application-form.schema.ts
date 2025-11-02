import z from "zod";

export const applicationFormSchema = z.object({
  full_name: z.string(),
  photo_profile: z.string(),
  gender: z.enum(["Male", "Female"]),
  domicile: z.string(),
  email: z.email(),
  phone_number: z.string(),
  linkedin_link: z.string(),
  date_of_birth: z.date(),
});
