"use client";

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
import { Card } from "@/lib/generated/prisma/client";

type Props = {
  data: Card;
  boardId: string;
};
export function TicketCardBody({
  data: { priority, assignedToEmail, listId, id },
  boardId,
}: Props) {
  return (
    <div className="flex justify-between w-full">
      {/* PRIORITIES  */}
      <Priority
        priority={priority}
        boardId={boardId}
        listId={listId}
        cardId={id}
      />

      {/* ASSIGN  */}

      <AssignTo
        assignedTo={assignedToEmail}
        boardId={boardId}
        listId={listId}
        cardId={id}
      />
    </div>
  );
}
