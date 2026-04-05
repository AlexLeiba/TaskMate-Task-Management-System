import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = { visible?: boolean };
export function Logo({ visible = false }: Props) {
  return (
    <Link
      href="/"
      title="Home"
      aria-label="Home"
      className={cn(visible ? "" : "md:block hidden", "")}
      data-test="logo"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={32}
        className="w-full h-8 object-contain"
      />
    </Link>
  );
}
