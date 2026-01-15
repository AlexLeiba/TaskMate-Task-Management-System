"use client";
import { NAV_LINKS } from "@/lib/consts";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";
function Links() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  console.log("🚀 ~ Header ~ user:", isSignedIn);
  return (
    <nav>
      {(pathname === NAV_LINKS.signin.pathname ||
        pathname === NAV_LINKS.landing.pathname) && (
        <div className="flex gap-2">
          <Button variant={"secondary"}>
            <Link href={NAV_LINKS.signup.pathname}>
              <p className="text-base">Join for free</p>
            </Link>
          </Button>
          <Button>
            <Link href={NAV_LINKS.signin.pathname}>
              <p className="text-base">Login</p>
            </Link>
          </Button>
        </div>
      )}
      {pathname === NAV_LINKS.signup.pathname && (
        <Link href={NAV_LINKS.signin.pathname}>
          <Button>
            <p className="text-base">Login</p>
          </Button>
        </Link>
      )}
    </nav>
  );
}

export default Links;
