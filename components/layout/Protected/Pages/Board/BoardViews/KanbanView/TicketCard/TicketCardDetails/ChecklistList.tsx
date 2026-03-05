import { Spacer } from "@/components/ui/spacer";
import { CheckSquare } from "lucide-react";
import { ProgressBar } from "./InteractiveFeaturesTabs/Checklist/ProgressBar";
import { cn } from "@/lib/utils";
import { ChecklistType } from "@/lib/types";
import { CompletedStats } from "./InteractiveFeaturesTabs/Checklist/CompletedStats";
import { checklistStatusColors } from "@/lib/checklistStatusColors";

type Props = {
  cardDetailsId: string | undefined;
  listId: string | undefined;
  data: ChecklistType[] | undefined;
};
export function ChecklistList({ data = [] }: Props) {
  const percentage = Math.round(
    (data?.filter((item) => item.isCompleted).length / data.length) * 100,
  );
  const completedTasks = data?.filter((item) => item.isCompleted);

  if (data?.length === 0) return;
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <CheckSquare />
          <h5 className="text-xl font-medium">Checklist</h5>
        </div>
        {data.length > 0 && (
          <CompletedStats
            className={cn(checklistStatusColors({ status: percentage >= 50 }))}
            stats={`${completedTasks.length}/${data.length}`}
          />
        )}
      </div>
      <div className="overflow-y-auto ">
        <Spacer size={4} />

        {data?.length > 0 && <ProgressBar percentage={percentage} />}
      </div>
    </div>
  );
}
