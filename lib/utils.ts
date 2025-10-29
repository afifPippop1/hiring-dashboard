import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY } from "./job/job.schema";
import { HANDPOSE_1, HANDPOSE_2, HANDPOSE_3 } from "./assets";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: CURRENCY.IDR,
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

export function getHandposeAsset(pose: 1 | 2 | 3) {
  switch (pose) {
    case 1:
      return HANDPOSE_1;
    case 2:
      return HANDPOSE_2;
    case 3:
      return HANDPOSE_3;
  }
}
