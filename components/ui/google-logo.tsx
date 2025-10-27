import { GOOGLE_LOGO } from "@/lib/assets";
import Image, { ImageProps } from "next/image";

export function GoogleLogo(props: Omit<ImageProps, "alt" | "src">) {
  return (
    <Image
      priority
      width={24}
      height={24}
      alt="google-logo"
      src={GOOGLE_LOGO}
      {...props}
    />
  );
}
