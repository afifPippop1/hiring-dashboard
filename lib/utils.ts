import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

export function formatMinMaxSalary({
  min,
  max,
}: {
  min?: number;
  max?: number;
}): string {
  const formattedMin = min ? displayCurrency(min) : "";
  const formattedMax = max ? displayCurrency(max) : "";
  if (min && max && min === max) return formattedMin;
  else if (min && max) return `${formattedMin} - ${formattedMax}`;
  else if (min) return formattedMin;
  else if (max) return formattedMax;
  else return "";
}
