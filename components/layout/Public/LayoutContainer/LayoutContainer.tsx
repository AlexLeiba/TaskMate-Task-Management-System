import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  fluid?: boolean;
  children: React.ReactNode;
};
export function LayoutContainer({ fluid, children, ...props }: Props) {
  return (
    <section
      className={cn(fluid ? "w-full py-8" : "w-full max-w-7xl mx-auto  py-8")}
      {...props}
    >
      <div className="px-4">{children}</div>
    </section>
  );
}
