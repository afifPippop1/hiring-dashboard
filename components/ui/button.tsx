"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-bold disabled:pointer-events-none disabled:bg-neutral-30 disabled:text-neutral-60 disabled:border-neutral-40 disabled:border [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer shadow-button h-max",
  {
    variants: {
      variant: {
        primary: "bg-primary text-neutral-10 hover:bg-primary-hover",
        destructive:
          "bg-destructive text-white hover:bg-danger focus-visible:ring-danger-border",
        secondary: "bg-secondary text-neutral-90 hover:bg-secondary-hover",
        outline:
          "border border-neutral-40 text-neutral-100 shadow-xs hover:bg-accent",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "gap-1.5 px-4 py-1 text-sm",
        md: "px-4 py-1 text-m",
        lg: "px-4 py-1.5 text-l",

        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof motion.button> &
  VariantProps<typeof buttonVariants>) {
  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
