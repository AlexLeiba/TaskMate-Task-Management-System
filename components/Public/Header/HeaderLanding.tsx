import { HeaderDesktopTabletContent } from "./HeaderDesktopTabletContent";
import { HeaderMobileContent } from "./HeaderMobileContent";

export function HeaderLanding() {
  return (
    <header>
      {/* DESKTOP */}

      <HeaderDesktopTabletContent />

      {/* MOBILE */}

      <HeaderMobileContent />
    </header>
  );
}
