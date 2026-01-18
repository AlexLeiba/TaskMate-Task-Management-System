import React from "react";

export function ActivityCardSkeleton() {
  return (
    <div className="max-h-29.25 animate-pulse">
      <div className=" h-9 flex gap-2">
        <div className="bg-gray-700 rounded-full size-8"></div>
        <div className="h-full w-1/2 bg-gray-700"></div>
      </div>
      <div className="bg-gray-700 h-full w-87.5"></div>
    </div>
  );
}
