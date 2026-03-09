import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export function SocialMediaLinks() {
  return (
    <div className="flex md:items-center  gap-2">
      <Link
        href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}
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
        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
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
        href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}
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
  );
}
