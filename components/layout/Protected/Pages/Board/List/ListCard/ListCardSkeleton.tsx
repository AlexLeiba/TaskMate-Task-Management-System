import React from "react";

export function ListCardSkeleton() {
  return (
    <div className="flex gap-4 w-full">
      <div className=" shrink-0 h-60 py-2 px-2 bg-black/80 text-white w-70 rounded-md animate-pulse " />

      <div className=" shrink-0 h-60 py-2 px-2 bg-black/80 text-white w-70 rounded-md  animate-pulse " />
    </div>
  );
}
