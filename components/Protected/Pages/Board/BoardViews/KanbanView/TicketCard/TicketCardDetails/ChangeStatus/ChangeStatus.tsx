import { Spacer } from "@/components/ui/spacer";
import { CircleCheck } from "lucide-react";

import { PriorityType } from "@/lib/generated/prisma/enums";
import dynamic from "next/dynamic";

const ChangeStatusDropdown = dynamic(() =>
  import("./ChangeStatusDropdown").then((m) => m.ChangeStatusDropdown),
);

type Props = {
  priority: PriorityType | undefined;
  listId: string | undefined;
  cardDetailsId: string | undefined;
};

export function ChangeStatus({ priority, listId, cardDetailsId }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <CircleCheck className="text-green-500" />
        <p className="text-xl font-medium">Change Status</p>
      </div>

      <Spacer size={2} />
      <ChangeStatusDropdown
        priority={priority}
        listId={listId}
        cardId={cardDetailsId}
      />
    </div>
  );
}
