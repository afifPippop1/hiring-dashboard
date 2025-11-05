import { ApplicationFormKey, ApplicationFormSchema } from "../types";

export function generateOrderedApplicationFields(
  form: Partial<ApplicationFormSchema>,
  order: ApplicationFormKey[]
) {
  return order
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
