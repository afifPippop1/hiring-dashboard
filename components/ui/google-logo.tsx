import Image, { ImageProps } from "next/image";

const LOGO_SRC = "/assets/svg/google-logo.svg";

export function GoogleLogo(props: Omit<ImageProps, "alt" | "src">) {
  return (
    <Image
      priority
      width={24}
      height={24}
      alt="google-logo"
      src={LOGO_SRC}
      {...props}
    />
  );
}
