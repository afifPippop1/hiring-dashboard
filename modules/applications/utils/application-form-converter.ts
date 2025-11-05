import {
  APPLICATION_FORM_FIELD_OPTIONS,
  APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE,
} from "../constants";
import { ApplicationFormBuilderSchema, ApplicationFormFields } from "../types";

export class ApplicationFormConverter {
  static toApplicationFieldOptionObject(
    data: ApplicationFormFields
  ): ApplicationFormBuilderSchema {
    const form: ApplicationFormBuilderSchema = {
      ...APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE,
    };

    const fieldMap = Object.fromEntries(
      data.map((f) => [
        f.key,
        f.validation.required
          ? APPLICATION_FORM_FIELD_OPTIONS.Mandatory
          : APPLICATION_FORM_FIELD_OPTIONS.Optional,
      ])
    );

    for (const key of Object.keys(
      APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE
    ) as (keyof ApplicationFormBuilderSchema)[]) {
      form[key] =
        (fieldMap[key] as ApplicationFormBuilderSchema[typeof key]) ||
        APPLICATION_FORM_FIELD_OPTIONS.Off;
    }

    return form;
  }

  static toOrderedList(
    data: ApplicationFormBuilderSchema
  ): ApplicationFormFields {
    const orderedKeys = Object.keys(
      APPLICATION_FORM_FIELDS_BUILDER_DEFAULT_VALUE
    ) as (keyof ApplicationFormBuilderSchema)[];

    return orderedKeys
      .filter((key) => data[key] !== APPLICATION_FORM_FIELD_OPTIONS.Off)
      .map((key) => ({
        key,
        validation: {
          required: data[key] === APPLICATION_FORM_FIELD_OPTIONS.Mandatory,
        },
      }));
  }
}
