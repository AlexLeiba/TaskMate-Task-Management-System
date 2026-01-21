import { cva } from "class-variance-authority";
import React from "react";

const cardVariants = cva("bg-gray-700 rounded-full animate-pulse", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
type Props = {
  size: "sm" | "md" | "lg" | undefined | null;
};
export function UserCardSkeleton({ size }: Props) {
  return (
    <div className="flex gap-2 items-center min-h-9">
      <div className={cardVariants({ size })} />
      <div className="w-37.5 h-8 bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  );
}
