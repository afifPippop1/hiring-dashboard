import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ApplicationFormSchema } from "@/lib/application_form/application-form.schema";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const domicileOptions = [
  "Kabupaten Aceh Barat - Aceh",
  "Kabupaten Aceh Besar - Aceh",
  "Kabupaten Aceh Selatan - Aceh",
  "Kabupaten Aceh Tengah - Aceh",
  "Kabupaten Aceh Tenggara - Aceh",
  "Kota Banda Aceh - Aceh",
  "Kota Langsa - Aceh",
  "Kabupaten Deli Serdang - Sumatera Utara",
  "Kota Medan - Sumatera Utara",
  "Kota Pematangsiantar - Sumatera Utara",
  "Kabupaten Agam - Sumatera Barat",
  "Kota Padang - Sumatera Barat",
  "Kabupaten Kampar - Riau",
  "Kota Pekanbaru - Riau",
  "Kota Jambi - Jambi",
  "Kabupaten Musi Banyuasin - Sumatera Selatan",
  "Kota Palembang - Sumatera Selatan",
  "Kabupaten Lampung Selatan - Lampung",
  "Kota Bandar Lampung - Lampung",
  "Kabupaten Tangerang - Banten",
  "Kota Tangerang Selatan - Banten",
  "Kota Jakarta Barat - DKI Jakarta",
  "Kota Jakarta Timur - DKI Jakarta",
  "Kota Jakarta Selatan - DKI Jakarta",
  "Kabupaten Bogor - Jawa Barat",
  "Kota Bekasi - Jawa Barat",
  "Kota Bandung - Jawa Barat",
  "Kabupaten Semarang - Jawa Tengah",
  "Kota Semarang - Jawa Tengah",
  "Kota Surakarta - Jawa Tengah",
  "Kabupaten Sidoarjo - Jawa Timur",
  "Kota Surabaya - Jawa Timur",
  "Kabupaten Badung - Bali",
  "Kota Denpasar - Bali",
  "Kabupaten Lombok Barat - Nusa Tenggara Barat",
  "Kota Mataram - Nusa Tenggara Barat",
  "Kabupaten Gowa - Sulawesi Selatan",
  "Kota Makassar - Sulawesi Selatan",
  "Kabupaten Minahasa - Sulawesi Utara",
  "Kota Manado - Sulawesi Utara",
  "Kabupaten Jayapura - Papua",
  "Kota Jayapura - Papua",
];

export function DomicileForm() {
  const { control } = useFormContext<ApplicationFormSchema>();

  return (
    <Controller
      control={control}
      name="domicile"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required>Domicile</FieldLabel>
          <DomicileAutocomplete
            value={field.value}
            onChange={field.onChange}
            options={domicileOptions}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface DomicileAutocompleteProps {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function DomicileAutocomplete({
  value = "",
  onChange,
  options,
  placeholder = "Choose your domicile",
}: DomicileAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  // Filter options dynamically
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (selected: string) => {
    onChange(selected);
    setInputValue(selected);
    setOpen(false);
  };

  return (
    <Command>
      <CommandInput
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onValueChange={onChange}
        value={value}
      />
      {open && (
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandList>
      )}
    </Command>
  );
}
