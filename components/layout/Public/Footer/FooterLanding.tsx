import Link from "next/link";
import { Logo } from "../../Logo/Logo";
import { FOOTER_TABS_LINKS, NAV_LINKS } from "@/lib/consts";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";

export function FooterLanding() {
  const date = new Date();
  return (
    <footer className="p-4 bg-background-element text-primary ">
      <div className="max-w-7xl  mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          <div className="flex flex-col gap-2">
            <Logo />

            <Link
              href={NAV_LINKS.signin.pathname}
              title={"Log in"}
              aria-label="Log in"
            >
              <p className="text-base">Log in</p>
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

        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href={"/"} title="Privacy Policy" aria-label="Privacy Policy">
              <p>Privacy Policy</p>
            </Link>
            <Link href={"/"} title="Terms" aria-label="Terms">
              <p>Terms</p>
            </Link>

            <p>Copyright © {date.getFullYear()} Alex Leiba Lapteacru</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={"/"}
              className="group"
              target="_blank"
              title="Gihub"
              aria-label="Gihub"
            >
              <div className="p-2 rounded-full group-hover:bg-tertiary/20">
                <Github className="group-hover:text-tertiary" />
              </div>
            </Link>
            <Link
              href={"/"}
              className="group"
              target="_blank"
              title="Gmail"
              aria-label="Gmail"
            >
              <div className="p-2 rounded-full group-hover:bg-tertiary/20">
                <Mail className="group-hover:text-tertiary" />
              </div>
            </Link>
            <Link
              href={"/"}
              className="group"
              target="_blank"
              title="Linkedin"
              aria-label="Linkedin"
            >
              <div className="p-2 rounded-full group-hover:bg-tertiary/20">
                <Linkedin className="group-hover:text-tertiary" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
