import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="md:mt-8 mt-4">
        <SignUp
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

export default SignUpPage;
