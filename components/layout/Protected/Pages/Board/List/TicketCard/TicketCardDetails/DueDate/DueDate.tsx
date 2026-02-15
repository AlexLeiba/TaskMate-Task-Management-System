import { Spacer } from "@/components/ui/spacer";
import { Calendar1Icon, Info } from "lucide-react";
import { DueDateInputs } from "./DueDateInputs";
import { type DueDate } from "@/lib/generated/prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  data: DueDate[] | undefined;
  cardDetailsId: string | undefined;
};
export function DueDate({ data, cardDetailsId }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex items-center gap-2">
          <Calendar1Icon size={24} />
          <h5 className="text-xl font-medium text-nowrap">Due Date</h5>
        </div>

        <Tooltip>
          <TooltipTrigger asChild className=" text-gray-400">
            <Info />
          </TooltipTrigger>
          <TooltipContent className="min-w-20 max-w-90 flex flex-col gap-1">
            <p className="text-sm">
              <strong>Gray color -</strong> more than 24 hours remained.
            </p>
            <p className="text-sm">
              <strong>Yellow color -</strong> less than 24 hours remained.
            </p>
            <p className="text-sm">
              <strong>Red color -</strong> The date has passed.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Spacer size={4} />
      <DueDateInputs data={data} cardDetailsId={cardDetailsId} />
    </div>
  );
}
