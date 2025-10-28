import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const chipVariants = cva(
  "px-3 py-1 text-md rounded-full border bg-neutral-10 hover:border-neutral-40 hover:bg-neutral-30 hover:text-neutral-90 select-none",
  {
    variants: {
      active: {
        true: "border-primary text-primary hover:bg-neutral-10 hover:text-primary hover:border-primary",
        false: "border-neutral-40 text-neutral-90",
      },
      disabled: {
        true: "cursor-not-allowed border-neutral-40 bg-neutral-30 text-neutral-90 hover:border-neutral-40 hover:bg-neutral-30 hover:text-neutral-90",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export default function Chip({
  className,
  active,
  disabled,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof chipVariants>) {
  return (
    <div
      {...props}
      className={cn(chipVariants({ className, active, disabled }))}
    />
  );
}
