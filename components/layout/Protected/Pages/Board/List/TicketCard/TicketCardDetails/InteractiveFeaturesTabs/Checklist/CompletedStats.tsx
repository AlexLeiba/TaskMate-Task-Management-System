import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  stats: string;
};
export function CompletedStats({ stats, className, ...props }: Props) {
  return (
    <div className={cn("rounded-md px-2 bg-green-400", className)} {...props}>
      <p className="text-sm text-black">{stats}</p>
    </div>
  );
}
