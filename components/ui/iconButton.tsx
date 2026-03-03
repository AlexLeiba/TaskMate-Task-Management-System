"use client";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = ComponentProps<"button"> & {
  loading?: boolean;
  disabled?: boolean;
  classNameChildren?: string;
  buttonType?: "card";
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
        "flex justify-center items-center transition-all",
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
          "w-full",
          loading ? "hidden" : "opacity-100",
          classNameChildren,
        )}
      >
        {children}
      </div>
      {loading && (
        <Loader2
          className={cn(loading ? "opacity-100" : "opacity-0", "animate-spin")}
        />
      )}
    </button>
  );
}
