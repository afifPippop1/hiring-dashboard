import {
  ApplicationFormKey,
  ApplicationFormSchema,
} from "./application-form.schema";

export function applicationFormMapper(form: ApplicationFormSchema) {
  const keyOrder: ApplicationFormKey[] = [
    "full_name",
    "email",
    "phone_number",
    "date_of_birth",
    "domicile",
    "gender",
    "linkedin_link",
    "photo_profile",
  ];

  return keyOrder
    .filter((key) => form[key] !== undefined && form[key] !== null)
    .map((key, index) => ({
      key,
      label: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      value:
        form[key] instanceof Date
          ? (form[key] as Date).toLocaleDateString()
          : String(form[key]),
      order: index + 1,
    }));
}
