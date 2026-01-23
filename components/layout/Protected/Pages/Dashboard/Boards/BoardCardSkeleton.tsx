import React from "react";

export function BoardCardSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-2">
      <div className="h-28 rounded-md bg-gray-700 animate-pulse" />

      <div className="h-28 rounded-md bg-gray-700 animate-pulse" />

      <div className="h-28 rounded-md bg-gray-700 animate-pulse" />

      <div className="h-28 rounded-md bg-gray-700 animate-pulse" />
    </div>
  );
}
