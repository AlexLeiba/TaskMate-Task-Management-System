import Link from "next/link";
import { Logo } from "../../Shared/Logo";

import { Separator } from "@/components/ui/separator";
import { SocialMediaLinks } from "../../Shared/SocialMediaLinks";
import { FOOTER_TABS_LINKS } from "@/lib/consts/public/footer";
import { NAV_LINKS } from "@/lib/consts/links";

export function FooterLanding() {
  const date = new Date();
  return (
    <footer className="p-4 bg-background-element text-primary ">
      <div className="max-w-6xl  mx-auto ">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          <div className="flex flex-col gap-2 p-2 items-start">
            <Logo visible />

            <Link
              href={NAV_LINKS.signin.pathname}
              title={"Log in"}
              aria-label="Log in"
            >
              <p className="text-base underline underline-offset-3 hover:text-tertiary">
                Log in
              </p>
            </Link>
          </div>

          {FOOTER_TABS_LINKS.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              title={item.label}
              aria-label={item.label}
            >
              <div className="flex flex-col gap-2 hover:bg-tertiary/20 p-2 h-full">
                <p className="text-lg">{item.label}</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex md:flex-row  flex-col-reverse gap-4 justify-between items-center">
          <div className="flex items-center gap-8 md:flex-row flex-col">
            <Link href={"/"} title="Privacy Policy" aria-label="Privacy Policy">
              <p className="text-base underline underline-offset-3 hover:text-tertiary">
                Privacy Policy
              </p>
            </Link>
            <Link href={"/"} title="Terms" aria-label="Terms">
              <p className="text-base underline underline-offset-3 hover:text-tertiary">
                Terms
              </p>
            </Link>

            <p>Copyright © {date.getFullYear()} Alex Leiba Lapteacru</p>
          </div>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
