import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 bg-gray-900 rounded-md px-3 py-2">
      {children}
    </div>
  );
}
