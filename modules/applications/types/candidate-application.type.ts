import {
  ApplicationFormAttributes,
  ApplicationFormKey,
  ApplicationFormSchema,
} from "./application-form.type";

export type CandidateApplicationForm = {
  id: string;
  attributes: ApplicationFormAttributes[];
};

export type FlattenedCandidateApplicationForm = { id: string } & {
  [key in ApplicationFormKey]: ApplicationFormSchema[key];
};
