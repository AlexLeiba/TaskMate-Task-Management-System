"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";

import { Button } from "../../ui/button";
import Link from "next/link";

function Links() {
  const { isSignedIn } = useUser();

  console.log("🚀 ~ Header ~ user:", isSignedIn);
  return (
    <nav className="flex gap-4">
      <Link href={"/about"}>About</Link>
      <Link href={"/contact"}>Contact</Link>
      <Link href={"/settings"}>Settings</Link>
    </nav>
  );
}

export default Links;
