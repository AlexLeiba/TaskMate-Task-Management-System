import { Spacer } from "@/components/ui/spacer";
import { List } from "@/lib/generated/prisma/client";
import { CircleCheck } from "lucide-react";

import dynamic from "next/dynamic";

const ChangeStatusDropdown = dynamic(() =>
  import("./ChangeStatusDropdown").then((m) => m.ChangeStatusDropdown),
);

type Props = {
  listId: string | undefined;
  cardId: string | undefined;
  currentStatusType: Pick<List, "id" | "status" | "title"> | undefined;
  listsData: Pick<List, "id" | "status" | "title">[];
};

export function ChangeStatus({
  listId,
  cardId,
  currentStatusType,
  listsData,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <CircleCheck className="text-green-500" />
        <p className="text-xl font-medium">Change Status</p>
      </div>

      <Spacer size={2} />
      <ChangeStatusDropdown
        listId={listId}
        cardId={cardId}
        currentStatusType={currentStatusType}
        listsData={listsData}
      />
    </div>
  );
}
