import { BREAKPOINTS } from "@/lib/breakpoints";
import * as React from "react";

export function useResponsive(breakpoint: number = BREAKPOINTS.sm): boolean {
  const [isWidthSize, setIsWidthSize] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsWidthSize(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsWidthSize(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isWidthSize;
}
