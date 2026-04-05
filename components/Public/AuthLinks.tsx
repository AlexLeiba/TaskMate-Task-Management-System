"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/consts/links";
function Links() {
  const pathname = usePathname();

  return (
    <nav data-test="auth-links">
      {pathname !== NAV_LINKS.signin.pathname &&
        pathname !== NAV_LINKS.signup.pathname && (
          <div className="flex gap-2 md:flex-row flex-col">
            <Link href={NAV_LINKS.signin.pathname} data-test="signin-link">
              <Button variant={"outline"}>
                <p className="text-base">Login</p>
              </Button>
            </Link>
            <Link href={NAV_LINKS.signup.pathname} data-test="signup-link">
              <Button variant={"tertiary"}>
                <p className="text-base">Join for free</p>
              </Button>
            </Link>
          </div>
        )}
      {pathname === NAV_LINKS.signup.pathname && (
        <Link href={NAV_LINKS.signin.pathname} data-test="signin-link">
          <Button>
            <p className="text-base">Sign in</p>
          </Button>
        </Link>
      )}
      {pathname === NAV_LINKS.signin.pathname && (
        <Link href={NAV_LINKS.signup.pathname} data-test="signup-link">
          <Button>
            <p className="text-base">Sign up for free</p>
          </Button>
        </Link>
      )}
    </nav>
  );
}

export default Links;
