import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Logo() {
  return (
    <Link href="/" title="Home">
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
