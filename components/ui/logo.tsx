import Image from "next/image";

const LOGO_SRC = "/assets/svg/logo.svg";

export function Logo() {
  return <Image priority alt="Logo" src={LOGO_SRC} width={145} height={50} />;
}
