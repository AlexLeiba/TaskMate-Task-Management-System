import { Spacer } from "@/components/ui/spacer";
import { PrioritiesType } from "@/lib/types";
import { Wifi } from "lucide-react";
import { PriorityDropdown } from "./PriorityDropdown";

type Props = {
  data: PrioritiesType;
};
export function Priority({ data }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <Wifi />
        <p className="text-xl font-medium">Priority</p>
      </div>

      <Spacer size={4} />
      <PriorityDropdown data={data} />
    </div>
  );
}
