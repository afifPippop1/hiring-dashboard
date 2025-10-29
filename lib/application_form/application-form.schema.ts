import z from "zod";

type ApplicationFormField = {
  key: ApplicationFormKey;
  validation: { required: boolean };
};
type ApplicationFormFields = ApplicationFormField[];

const applicationFormSchema = z.object({
  full_name: z.string(),
  photo_profile: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  domicile: z.string(),
  email: z.email(),
  phone_number: z.string(),
  linkedin_link: z.string(),
  date_of_birth: z.date(),
});

type ApplicationFormSchema = z.infer<typeof applicationFormSchema>;

type ApplicationFormKey = keyof ApplicationFormSchema;

type ApplicationFormAttributes = {
  key: ApplicationFormKey;
  label: string;
  value: ApplicationFormSchema[ApplicationFormKey];
  order: number;
};
type CandidateApplicationForm = {
  id: string;
  attributes: ApplicationFormAttributes[];
};

type FlattenedCandidateApplicationForm = { id: string } & {
  [key in ApplicationFormKey]: ApplicationFormSchema[key];
};

export { applicationFormSchema };

export type {
  ApplicationFormAttributes,
  ApplicationFormField,
  ApplicationFormFields,
  ApplicationFormKey,
  ApplicationFormSchema,
  CandidateApplicationForm,
  FlattenedCandidateApplicationForm,
};
