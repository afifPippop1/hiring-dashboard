import Chip from "../ui/chip";

const FORM_ITEM_OPTIONS = {
  Mandatory: "Mandatory",
  Optional: "Optional",
  Off: "Off",
} as const;

type FormItemOption =
  (typeof FORM_ITEM_OPTIONS)[keyof typeof FORM_ITEM_OPTIONS];

type FormFieldOption = {
  value: FormItemOption;
  selectable: boolean;
};

const ProfileInfoChecklist: {
  field: string;
  options: FormFieldOption[];
}[] = [
  {
    field: "Full name",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: false },
      { value: FORM_ITEM_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "Photo Profile",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: false },
      { value: FORM_ITEM_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "Gender",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: true },
      { value: FORM_ITEM_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "Domicile",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: true },
      { value: FORM_ITEM_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "Email",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: false },
      { value: FORM_ITEM_OPTIONS.Off, selectable: false },
    ],
  },
  {
    field: "Phone number",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: true },
      { value: FORM_ITEM_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "Linkedin link",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: true },
      { value: FORM_ITEM_OPTIONS.Off, selectable: true },
    ],
  },
  {
    field: "Date of birth",
    options: [
      { value: FORM_ITEM_OPTIONS.Mandatory, selectable: true },
      { value: FORM_ITEM_OPTIONS.Optional, selectable: true },
      { value: FORM_ITEM_OPTIONS.Off, selectable: true },
    ],
  },
];

export function FormDataChecklist() {
  return (
    <div className="p-4 border border-neutral-30 rounded-[8px]">
      <h3 className="text-md font-bold">
        Minimum Profile Information Required
      </h3>
      <section className="p-2">
        {ProfileInfoChecklist.map((item) => (
          <FormDataChecklistItem
            key={item.field}
            field={item.field}
            value="Mandatory"
            options={item.options}
          />
        ))}
      </section>
    </div>
  );
}

function FormDataChecklistItem({
  field,
  value,
  options,
}: {
  field: string;
  value: FormItemOption;
  options: FormFieldOption[];
}) {
  return (
    <div className="px-2 py-3 flex justify-between items-center">
      <p className="text-md text-neutral-90">{field}</p>
      <div className="flex items-center gap-2">
        {options.map((option) => (
          <Chip
            key={option.value}
            active={option.value === value}
            disabled={!option.selectable}
          >
            {option.value}
          </Chip>
        ))}
      </div>
    </div>
  );
}
