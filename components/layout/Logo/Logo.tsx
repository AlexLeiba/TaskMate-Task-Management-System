import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { type?: "header" | "footer" };
export function Logo({ type = "header" }: Props) {
  return (
    <Link
      href="/"
      title="Home"
      className={cn(type === "header" ? "md:block hidden" : "")}
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
