import Link from "next/link";
import { Logo } from "../../Logo/Logo";
import { FOOTER_TABS_LINKS, NAV_LINKS } from "@/lib/consts";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";

export function FooterLanding() {
  return (
    <footer className="p-4 bg-background-element text-primary ">
      <div className="max-w-7xl  mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          <div className="flex flex-col">
            <Logo />

            <Link href={NAV_LINKS.signin.pathname}>
              <p className="text-base">Log in</p>
            </Link>
          </div>

          {FOOTER_TABS_LINKS.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href={"/"}>
              <p>Privacy Policy</p>
            </Link>
            <Link href={"/"}>
              <p>Terms</p>
            </Link>
            <Link href={"/"}>
              <p>Copyright © 2026 Alex Leiba Lapteacru</p>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link href={"/"} className="group" target="_blank">
              <Github className="group-hover:text-tertiary" />
            </Link>
            <Link href={"/"} className="group" target="_blank">
              <Mail className="group-hover:text-tertiary" />
            </Link>
            <Link href={"/"} className="group" target="_blank">
              <Linkedin className="group-hover:text-tertiary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
