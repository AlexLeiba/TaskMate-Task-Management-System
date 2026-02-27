import { DATE_FORMAT } from "@/lib/consts";
import { format } from "date-fns";
import React from "react";

type Props = {
  createdAt: Date | undefined | null;
  updatedAt: Date | undefined | null;
};
export function DateTime({ createdAt, updatedAt }: Props) {
  if (!createdAt || !updatedAt)
    return (
      <div className="h-10 bg-gray-700 animate-pulse rounded-md w-44.25"></div>
    );
  return (
    <div className="flex flex-col gap-2 dark:text-gray-400 ">
      <div className="flex gap-2 items-center">
        <p className="text-xs font-medium">Created:</p>

        <p className="text-xs font-medium">
          {format(new Date(createdAt), DATE_FORMAT)}
        </p>
      </div>

      <div className="flex gap-2 items-center ">
        <p className="text-xs font-medium">Updated:</p>
        <p className="text-xs font-medium">
          {format(new Date(updatedAt), DATE_FORMAT)}
        </p>
      </div>
    </div>
  );
}
