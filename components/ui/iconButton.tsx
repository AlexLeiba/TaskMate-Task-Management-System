"use client";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = ComponentProps<"button"> & {
  loading?: boolean;
  disabled?: boolean;
  classNameChildren?: string;
  buttonType?: "card" | "default";
};
export function IconButton({
  children,
  disabled,
  className,
  loading,
  classNameChildren,
  buttonType,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "flex justify-center items-center transition-all relative",
        disabled
          ? buttonType === "card"
            ? "pointer-events-none"
            : "opacity-50 "
          : "cursor-pointer hover:opacity-70",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          loading ? "opacity-0" : "opacity-100 w-full",
          classNameChildren,
        )}
      >
        {children}
      </div>
      {loading && (
        <Loader2
          className={cn(
            loading ? "opacity-100" : "opacity-0",
            "animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        />
      )}
    </button>
  );
}
