import React from "react";

export function UserProfileSkeleton() {
  return (
    <div className="h-full inline-flex items-center">
      <div className="size-6 rounded-full bg-gray-700 animate-pulse" />
    </div>
  );
}
