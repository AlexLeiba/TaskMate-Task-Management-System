import { CheckSquare } from "lucide-react";
import React from "react";

export function ChecklistSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 flex-col">
        <div className="flex gap-2 items-center">
          <CheckSquare />
          <h5 className="text-xl font-medium">Checklist</h5>
        </div>
        <div className="w-full h-px bg-gray-700" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-10 bg-gray-700 animate-pulse w-1/2 rounded-md" />
        <div className="h-10 bg-gray-700 animate-pulse w-1/3 rounded-md" />
        <div className="h-10 bg-gray-700 animate-pulse w-1/2 rounded-md" />
      </div>
    </div>
  );
}
