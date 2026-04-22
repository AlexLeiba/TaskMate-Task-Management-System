import React from "react";

export function NotificationIndicator({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 bg-red-600 rounded-full ml-2">
      <p className="text-sm">{children}</p>
    </div>
  );
}
