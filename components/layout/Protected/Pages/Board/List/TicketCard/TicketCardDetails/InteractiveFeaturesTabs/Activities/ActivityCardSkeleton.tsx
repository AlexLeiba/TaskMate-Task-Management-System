import React from "react";

export function ActivityCardSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index + 1);
  return (
    <div className="flex flex-col gap-4">
      {skeletonItems.map((item) => {
        return (
          <div className=" animate-pulse" key={item}>
            <div className=" h-12 flex gap-2">
              <div className="bg-gray-700 rounded-full size-8"></div>
              <div className="h-full w-1/2 bg-gray-700"></div>
            </div>
            <div className="bg-gray-700 h-full w-87.5"></div>
          </div>
        );
      })}
    </div>
  );
}
