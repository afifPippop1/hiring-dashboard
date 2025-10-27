import { LOGO } from "@/lib/assets";
import Image from "next/image";

export function Logo() {
  return <Image priority alt="Logo" src={LOGO} width={145} height={50} />;
}
