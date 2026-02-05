import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"div">;
export function Loader({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "flex justify-center items-center absolute top-50% left-50% ",
        className,
      )}
      {...props}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
