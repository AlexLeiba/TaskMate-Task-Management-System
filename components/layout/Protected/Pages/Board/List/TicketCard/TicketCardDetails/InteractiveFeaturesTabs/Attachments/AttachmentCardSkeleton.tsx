import React from "react";

export function AttachmentCardSkeleton() {
  return (
    <div className="max-h-[181px] flex flex-col gap-4 animate-pulse">
      <div className=" h-9 flex gap-2">
        <div className="bg-gray-700 rounded-full size-8"></div>
        <div className="h-full w-1/2 bg-gray-700"></div>
      </div>
      <div className="flex gap-8">
        <div className="bg-gray-700  w-[98px] h-[70px] rounded-md"></div>
        <div className="bg-gray-700  w-[98px] h-[70px] rounded-md"></div>
        <div className="bg-gray-700  w-[98px] h-[70px] rounded-md"></div>
      </div>
    </div>
  );
}
