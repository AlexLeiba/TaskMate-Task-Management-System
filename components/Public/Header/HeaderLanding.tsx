"use client";
import { useResponsive } from "@/hooks/useResponsive";
import { HeaderDesktopTabletContent } from "./HeaderDesktopTabletContent";
import { HeaderMobileContent } from "./HeaderMobileContent";
import { BREAKPOINTS } from "@/lib/breakpoints";

export function HeaderLanding() {
  const isMobile = useResponsive(BREAKPOINTS.md);

  return (
    <header className="">
      {/* DESKTOP */}
      {!isMobile && <HeaderDesktopTabletContent />}

      {/* MOBILE */}
      {isMobile && <HeaderMobileContent />}
    </header>
  );
}
