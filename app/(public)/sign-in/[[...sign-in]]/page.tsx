import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="mt-4">
        <SignIn
          appearance={{
            variables: {
              colorBackground: "oklch(30.919% 0.00004 271.152)", // dark background
              colorText: "oklch(91.817% 0.00323 15.438)",
              colorInputBackground: "oklch(30.919% 0.00004 271.152)",
              colorInputText: "oklch(91.817% 0.00323 15.438)",
            },

            elements: {
              socialButtonsBlockButton: " !text-white hover:opacity-70 ",
              footerActionLink: " !text-white hover:opacity-70 ",
            },
          }}
        />
      </div>
    </div>
  );
}

export default SignInPage;
