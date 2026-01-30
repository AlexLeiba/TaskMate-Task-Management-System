import { Spacer } from "@/components/ui/spacer";
import { Wifi } from "lucide-react";
import { PriorityDropdown } from "./PriorityDropdown";
import { PriorityType } from "@/lib/generated/prisma/enums";

type Props = {
  priority: PriorityType | undefined;
  listId: string | undefined;
  cardId: string | undefined;
};
export function Priority({ priority, listId, cardId }: Props) {
  return (
    <div className="flex flex-col w-[200px]">
      <div className="flex gap-2 items-center">
        <Wifi />
        <p className="text-xl font-medium">Priority</p>
      </div>

      <Spacer size={4} />
      <PriorityDropdown priority={priority} listId={listId} cardId={cardId} />
    </div>
  );
}
