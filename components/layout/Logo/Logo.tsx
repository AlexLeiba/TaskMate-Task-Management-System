import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = { visible?: boolean };
export function Logo({ visible = false }: Props) {
  return (
    <Link
      href="/"
      title="Home"
      className={cn(visible ? "" : "md:block hidden", "w-25 ")}
    >
      <Image
        src="/white-logo.webp"
        alt="Logo"
        width={100}
        height={24}
        className="w-full h-6"
      />
    </Link>
  );
}
