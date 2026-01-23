"use client";

import { AssignedToType } from "@/lib/types";

const AssignTo = dynamic(
  () => {
    return import("./AssignTo").then((m) => m.AssignTo);
  },
  {
    ssr: false,
    loading: () => <AssignToUserSkeleton />,
  },
);

import { Priority } from "./Priority";
import { AssignToUserSkeleton } from "./AssignToUserSkeleton";
import dynamic from "next/dynamic";

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

      <AssignTo assignedTo={assignedTo} />
    </div>
  );
}
