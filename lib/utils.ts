import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY } from "../modules/jobs";
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

export function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
