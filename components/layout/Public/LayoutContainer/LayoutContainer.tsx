import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  fluid?: boolean;
  children: React.ReactNode;
};
export function LayoutContainer({ fluid, children, ...props }: Props) {
  return (
    <section
      className={cn(fluid ? "w-full py-10" : "w-full max-w-6xl mx-auto  py-10")}
      {...props}
    >
      <div className="px-4">{children}</div>
    </section>
  );
}
