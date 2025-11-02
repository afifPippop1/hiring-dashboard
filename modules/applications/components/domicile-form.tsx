import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDown } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormSchema } from "../types";

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

export function DomicileForm({ required }: { required?: boolean }) {
  const { control } = useFormContext<ApplicationFormSchema>();

  return (
    <Controller
      control={control}
      name="domicile"
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel required={required}>Domicile</FieldLabel>
          <DomicileAutocomplete value={field.value} onChange={field.onChange} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface DomicileAutocompleteProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DomicileAutocomplete({
  value = "",
  onChange,
  placeholder = "Choose your domicile",
}: DomicileAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  function makeOpen() {
    setOpen(true);
  }

  function makeClose() {
    setOpen(false);
  }

  const filteredOptions = domicileOptions.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        makeClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <InputGroup>
        <InputGroupInput
          value={value}
          onFocus={makeOpen}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
        />
        <InputGroupAddon align="inline-end">
          <ChevronDown className="text-neutral-60" />
        </InputGroupAddon>
        {open && filteredOptions.length > 0 && (
          <div className="bg-neutral-10 max-h-72 absolute top-full mt-2 left-0 w-full shadow-lg border border-neutral-40 z-20 rounded-md overflow-auto">
            {filteredOptions.map((domicile) => (
              <div
                key={domicile}
                onClick={() => {
                  onChange(domicile);
                  makeClose();
                }}
                className="flex items-center gap-2 py-2 px-4 cursor-pointer text-sm font-bold hover:bg-primary-surface"
              >
                {domicile}
              </div>
            ))}
          </div>
        )}
      </InputGroup>
    </div>
  );
}
