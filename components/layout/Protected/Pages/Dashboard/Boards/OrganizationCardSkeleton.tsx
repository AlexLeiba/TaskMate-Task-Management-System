import React from "react";

export function OrganizationCardSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-12.75 rounded-md bg-gray-700 animate-pulse"></div>

      <div className="rounded-md bg-gray-700 animate-pulse w-37.5 h-10"></div>
    </div>
  );
}
