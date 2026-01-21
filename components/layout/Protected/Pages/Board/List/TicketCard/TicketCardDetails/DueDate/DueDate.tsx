import { Spacer } from "@/components/ui/spacer";

import { Calendar1Icon } from "lucide-react";

import { DueDateInputs } from "./DueDateInputs";
import { DueDateType } from "@/lib/types";

type Props = {
  data: DueDateType | undefined;
};
export function DueDate({ data }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex items-center gap-2">
          <Calendar1Icon size={24} />
          <p className="text-xl font-medium text-nowrap">Due Date</p>
        </div>
      </div>
      <Spacer size={4} />
      <DueDateInputs data={data} />

      {/* DELETE CARD DIALOG */}
    </div>
  );
}
