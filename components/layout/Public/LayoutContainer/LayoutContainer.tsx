import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  fluid?: boolean;
  children: React.ReactNode;
};
export function LayoutContainer({
  fluid,
  children,

  ...props
}: Props) {
  //  py - 12;
  return (
    <section
      className={cn(
        fluid ? "w-full" : "w-full max-w-6xl mx-auto ",
        "md:py-16 py-12",
      )}
      {...props}
    >
      <div className={cn(fluid ? "" : "px-4")}>{children}</div>
    </section>
  );
}
