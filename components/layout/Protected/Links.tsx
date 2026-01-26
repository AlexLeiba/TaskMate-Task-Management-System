"use client";

import Link from "next/link";

function Links() {
  return (
    <nav className="flex gap-4">
      <Link href={"/about"}>About</Link>
      <Link href={"/contact"}>Contact</Link>
      <Link href={"/settings"}>Settings</Link>
    </nav>
  );
}

export default Links;
