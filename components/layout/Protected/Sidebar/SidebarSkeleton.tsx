import React from "react";

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-15.5 dark:bg-gray-700 animate-pulse rounded-md" />
      <div className="h-15.5 dark:bg-gray-700 animate-pulse rounded-md" />
      <div className="h-15.5 dark:bg-gray-700 animate-pulse rounded-md" />
    </div>
  );
}
