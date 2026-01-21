import { Spacer } from "@/components/ui/spacer";
import { AssignedToType } from "@/lib/types";
import { UserPlus } from "lucide-react";
import { AssignToDropdown } from "./AssignToDropdown";

type Props = {
  data: AssignedToType | undefined;
};
export function AssignTo({ data }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <UserPlus />
        <p className="text-xl font-medium">Assign to</p>
      </div>
      <Spacer size={4} />
      <AssignToDropdown data={data} />
    </div>
  );
}
