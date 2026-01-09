import { NAV_LINKS } from "@/lib/consts";
import Link from "next/link";
import React from "react";

function Links() {
  return (
    <nav>
      <ul className="flex gap-4">
        {NAV_LINKS.map(({ pathname, name }) => (
          <li key={pathname}>
            <Link href={pathname}>
              <p className="text-base">{name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Links;
