import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <SignIn />
    </div>
  );
}

export default SignInPage;
