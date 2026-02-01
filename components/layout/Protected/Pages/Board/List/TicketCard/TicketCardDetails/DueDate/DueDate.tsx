import { Spacer } from "@/components/ui/spacer";

import { Calendar1Icon } from "lucide-react";

import { DueDateInputs } from "./DueDateInputs";
import { type DueDate } from "@/lib/generated/prisma/client";

type Props = {
  data: DueDate[] | undefined;

  cardDetailsId: string | undefined;
  listId: string | undefined;
};
export function DueDate({ data, cardDetailsId, listId }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex items-center gap-2">
          <Calendar1Icon size={24} />
          <p className="text-xl font-medium text-nowrap">Due Date</p>
        </div>
      </div>
      <Spacer size={4} />
      <DueDateInputs data={data} cardId={cardDetailsId} listId={listId} />

      {/* DELETE CARD DIALOG */}
    </div>
  );
}
