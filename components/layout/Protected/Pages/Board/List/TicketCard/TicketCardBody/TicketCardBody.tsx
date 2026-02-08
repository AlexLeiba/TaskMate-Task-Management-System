"use client";

const AssignTo = dynamic(() => import("./AssignTo").then((m) => m.AssignTo), {
  loading: () => <AssignToUserSkeleton />,
});

const Priority = dynamic(() => import("./Priority").then((m) => m.Priority));

import { AssignToUserSkeleton } from "./AssignToUserSkeleton";
import dynamic from "next/dynamic";
import { DueDateIndicator } from "./DueDateIndicator";
import { ChecklistIndicator } from "./ChecklistIndicator";
import { CardAndDueDateAndChecklistType } from "@/lib/types";

type Props = {
  data: CardAndDueDateAndChecklistType;
  boardId: string;
};
export function TicketCardBody({
  data: { priority, assignedToEmail, listId, id, details },
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

      <DueDateIndicator data={details?.dueDate?.[0]} />
      <ChecklistIndicator data={details?.checklist} />

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
