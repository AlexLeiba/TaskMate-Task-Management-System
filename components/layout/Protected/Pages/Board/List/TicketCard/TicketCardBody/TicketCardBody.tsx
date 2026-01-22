"use client";
import { Suspense } from "react";

import { AssignedToType } from "@/lib/types";

import { AssignTo } from "./AssignTo";
import { Priority } from "./Priority";
import { AssignToUserSkeleton } from "./AssignToUserSkeleton";

type Props = {
  priority: string;
  assignedTo: AssignedToType | undefined;
};
export function TicketCardBody({ priority, assignedTo }: Props) {
  return (
    <div className="flex justify-between w-full">
      {/* PRIORITIES  */}
      <Priority priority={priority} />

      {/* ASSIGN  */}
      <Suspense fallback={<AssignToUserSkeleton />}>
        <AssignTo assignedTo={assignedTo} />
      </Suspense>
    </div>
  );
}
