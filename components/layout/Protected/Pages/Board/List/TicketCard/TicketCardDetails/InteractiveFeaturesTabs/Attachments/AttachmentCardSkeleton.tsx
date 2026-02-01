import { Image } from "lucide-react";
import React from "react";

export function AttachmentCardSkeleton() {
  return (
    <div className="max-h-45.25 flex flex-col gap-4 animate-pulse">
      <div className="flex gap-2 items-center ">
        <Image />
        <h5 className="text-xl font-medium">Attachments</h5>
      </div>
      <div className=" h-9 flex gap-2 mt-2">
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
