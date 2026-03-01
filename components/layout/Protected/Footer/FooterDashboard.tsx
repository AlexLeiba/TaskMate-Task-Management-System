import Link from "next/link";
import { Logo } from "../../Logo/Logo";
import { Github, Linkedin, Mail } from "lucide-react";

export function FooterDashboard() {
  return (
    <footer className="p-4 bg-background-element text-white w-full">
      <div className="max-w-350 pl-4 mx-auto">
        <div className="flex justify-between items-center">
          <Logo visible />

          <div className="flex md:items-center  gap-2">
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
