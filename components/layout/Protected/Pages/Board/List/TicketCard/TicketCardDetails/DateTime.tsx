import { format } from "date-fns";
import React from "react";

type Props = {
  createdAt: number | undefined;
  updatedAt: number | undefined;
};
export function DateTime({ createdAt, updatedAt }: Props) {
  if (!createdAt || !updatedAt) return null;
  return (
    <div className="flex flex-col gap-2 dark:text-gray-400 ">
      <div className="flex gap-2 items-center">
        <p className="text-xs font-medium">Created:</p>

        <p className="text-xs font-medium">
          {format(new Date(createdAt), "MMM d yyyy a HH:mm")}
        </p>
      </div>

      <div className="flex gap-2 items-center ">
        <p className="text-xs font-medium">Updated:</p>
        <p className="text-xs font-medium">
          {format(new Date(updatedAt), "MMM d yyyy a HH:mm")}
        </p>
      </div>
    </div>
  );
}
