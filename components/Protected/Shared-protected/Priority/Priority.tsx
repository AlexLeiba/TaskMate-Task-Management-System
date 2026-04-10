import { Spacer } from "@/components/ui/spacer";
import { Wifi } from "lucide-react";

import { PriorityType } from "@/lib/generated/prisma/enums";
import dynamic from "next/dynamic";

const PriorityDropdown = dynamic(() =>
  import("./PriorityDropdown").then((m) => m.PriorityDropdown),
);
type Props = {
  priority: PriorityType | undefined;
  listId: string | undefined;
  cardDetailsId: string | undefined;
  type: "card" | "table";
};
export function Priority({ priority, listId, cardDetailsId, type }: Props) {
  return (
    <div className="flex flex-col w-full">
      {type === "card" && (
        <>
          <div className="flex gap-2 items-center">
            <Wifi />
            <p className="text-xl font-medium">Priority</p>
          </div>

          <Spacer size={2} />
        </>
      )}
      <PriorityDropdown
        priority={priority}
        listId={listId}
        cardId={cardDetailsId}
      />
    </div>
  );
}
