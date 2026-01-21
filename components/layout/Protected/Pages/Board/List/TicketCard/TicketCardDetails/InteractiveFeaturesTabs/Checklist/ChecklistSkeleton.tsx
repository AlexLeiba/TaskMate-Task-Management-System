import React from "react";

export function ChecklistSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-6 bg-gray-700 animate-pulse w-1/2" />
      <div className="h-6 bg-gray-700 animate-pulse w-1/3" />
      <div className="h-6 bg-gray-700 animate-pulse w-1/2" />
    </div>
  );
}
