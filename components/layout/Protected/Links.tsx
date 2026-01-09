"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";

import { Button } from "../../ui/button";

function Links() {
  const { isSignedIn } = useUser();

  console.log("🚀 ~ Header ~ user:", isSignedIn);
  return (
    <nav>
      <Button asChild>
        <SignOutButton />
      </Button>
    </nav>
  );
}

export default Links;
