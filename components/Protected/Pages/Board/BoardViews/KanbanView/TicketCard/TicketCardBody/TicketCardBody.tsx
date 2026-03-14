"use client";

import { AssignToUserSkeleton } from "./AssignToUserSkeleton";
import dynamic from "next/dynamic";
import { CardWithDetailsAndDueDateAndChecklistType } from "@/lib/types";

const AssignTo = dynamic(
  () => import("./AssignTo/AssignTo").then((m) => m.AssignTo),
  {
    loading: () => <AssignToUserSkeleton />,
  },
);

const Priority = dynamic(() => import("./Priority").then((m) => m.Priority));

const DueDateIndicator = dynamic(() =>
  import("./DueDateIndicator").then((m) => m.DueDateIndicator),
);

const ChecklistIndicator = dynamic(() =>
  import("./ChecklistIndicator").then((m) => m.ChecklistIndicator),
);

type Props = {
  data: CardWithDetailsAndDueDateAndChecklistType;
  boardId: string;
};
export function TicketCardBody({
  data: { priority, assignedTo, listId, id, details, assignedToEmail },
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

      {details?.dueDate?.[0] && (
        <DueDateIndicator data={details?.dueDate?.[0]} />
      )}
      {details?.checklist && <ChecklistIndicator data={details?.checklist} />}

      {/* ASSIGN  */}

      <AssignTo
        assignedToAvatar={assignedTo?.avatar}
        assignedToEmail={assignedToEmail}
        boardId={boardId}
        listId={listId}
        cardId={id}
      />
    </div>
  );
}
