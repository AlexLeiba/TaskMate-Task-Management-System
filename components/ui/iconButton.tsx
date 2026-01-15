import React, { ComponentProps } from "react";
import { Loader } from "./loader";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  loading?: boolean;
  disabled?: boolean;
  classNameChildren?: string;
};
export function IconButton({
  children,
  disabled,
  className,
  loading,
  classNameChildren,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "flex justify-center items-center transition-all",
        disabled
          ? "opacity-50 pointer-events-none"
          : "cursor-pointer hover:opacity-70",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full",
          loading ? "opacity-0" : "opacity-100",
          classNameChildren
        )}
      >
        {children}
      </div>
      {loading && <Loader className={loading ? "opacity-100" : "opacity-0"} />}
    </button>
  );
}
