import { Spacer } from "@/components/ui/spacer";
import { UserPlus } from "lucide-react";
import dynamic from "next/dynamic";

const AssignToDropdown = dynamic(() =>
  import("./AssignToDropdown").then((m) => m.AssignToDropdown),
);

type Props = {
  assignedTo: string | undefined;
  listId: string | undefined;
  cardDetailsId: string;
  type: "card" | "table";
};
export function AssignTo({
  assignedTo,
  listId,
  cardDetailsId,
  type = "card",
}: Props) {
  return (
    <div className="flex flex-col w-full">
      {type === "card" && (
        <>
          <div className="flex gap-2 items-center">
            <UserPlus />
            <p className="text-xl font-medium">Assign to</p>
          </div>
          <Spacer size={2} />
        </>
      )}
      <AssignToDropdown
        assignedTo={assignedTo}
        listId={listId}
        cardDetailsId={cardDetailsId}
      />
    </div>
  );
}
