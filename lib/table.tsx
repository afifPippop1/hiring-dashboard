import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  ApplicationFormKey,
  ApplicationFormSchema,
  CandidateApplicationForm,
  FlattenedCandidateApplicationForm,
} from "./application_form/application-form.schema";
import dayjs from "dayjs";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function flattenApplication(
  application: CandidateApplicationForm
): FlattenedCandidateApplicationForm {
  const { attributes, ...rest } = application;

  const flattened = attributes.reduce(
    (acc, attr) => {
      // @ts-expect-error type check validation missmatch
      acc[attr.key] = attr.value;
      return acc;
    },
    {} as {
      [key in ApplicationFormKey]: ApplicationFormSchema[key];
    }
  );

  return { ...flattened, id: rest.id };
}

export function createTableHeader(cols: CandidateApplicationForm) {
  const columns: ColumnDef<FlattenedCandidateApplicationForm>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  cols.attributes
    .sort((a, b) => a.order - b.order)
    .forEach((col) => {
      columns.push({
        accessorKey: col.key,
        header: col.label,
        cell: ({ row }) => {
          if (col.key === "date_of_birth") {
            return (
              <div>{dayjs(row.getValue(col.key)).format("DD MMMM YYYY")}</div>
            );
          }
          if (col.key === "linkedin_link") {
            return (
              <a
                className="text-primary"
                target="_blank"
                href={row.getValue(col.key)}
              >
                {row.getValue(col.key)}
              </a>
            );
          }
          if (col.key === "phone_number") {
            return (
              <div>
                {parsePhoneNumberFromString(
                  `+${row.getValue(col.key)}`
                )?.formatNational()}
              </div>
            );
          }

          return <div>{row.getValue(col.key)}</div>;
        },
      });
    });
  return columns;
}
