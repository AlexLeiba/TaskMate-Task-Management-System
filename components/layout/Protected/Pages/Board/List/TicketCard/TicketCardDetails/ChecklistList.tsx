import { Spacer } from "@/components/ui/spacer";
import { CheckSquare, Edit, Plus } from "lucide-react";
import { ProgressBar } from "./InteractiveFeaturesTabs/Checklist/ProgressBar";
import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
import { ChecklistType } from "@/lib/types";
import { useStore } from "@/store/useStore";
import { CompletedStats } from "./InteractiveFeaturesTabs/Checklist/CompletedStats";

//TODO FETCH DATA BASED ON CARD ID AND LIT ID

type Props = {
  cardDetailsId: string | undefined;
  listId: string | undefined;
  data: ChecklistType[] | undefined;
};
export function ChecklistList({ cardDetailsId, listId, data = [] }: Props) {
  const { setSelectTab } = useStore();

  function handleSelectChecklist(id: string) {
    // api req with list id and task id
  }

  function handleDeleteChecklist(id: string) {}

  const percentage = Math.round(
    (data?.filter((item) => item.isCompleted).length / data.length) * 100,
  );
  const completedTasks = data?.filter((item) => item.isCompleted);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <CheckSquare />
          <p className="text-xl font-medium">Checklist</p>
          {data.length > 0 && (
            <CompletedStats
              className={cn(
                percentage >= 50 ? "bg-green-400" : "bg-yellow-400",
              )}
              stats={`${completedTasks.length}/${data.length}`}
            />
          )}
        </div>
        {data.length > 0 && (
          <IconButton
            onClick={() => setSelectTab("checklist")}
            classNameChildren="flex items-center gap-2 text-gray-300"
            title="Add an item"
            aria-label="Add an item"
          >
            <Edit size={18} />
          </IconButton>
        )}
      </div>
      <div className="overflow-y-auto ">
        <Spacer size={4} />

        {data.length === 0 ? (
          <IconButton
            onClick={() => setSelectTab("checklist")}
            classNameChildren="flex items-center gap-2 text-gray-300 h-[44px]"
            title="Add an item"
            aria-label="Add an item"
          >
            <Plus />
            <p className="text-sm ">Add an item</p>
          </IconButton>
        ) : (
          <ProgressBar percentage={percentage} />
        )}
      </div>
    </div>
  );
}
