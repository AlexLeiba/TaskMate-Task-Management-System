import { Checkbox } from "@/components/ui/checkbox";
import { Spacer } from "@/components/ui/spacer";
import { CheckSquare, Delete, Plus } from "lucide-react";
import { ProgressBar } from "./InteractiveFeaturesTabs/Checklist/ProgressBar";
import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
import { KEYBOARD } from "@/lib/consts";
import { ChecklistType } from "@/lib/types";
import { useStore } from "@/store/useStore";
import { ChecklistCard } from "./InteractiveFeaturesTabs/Checklist/ChecklistCard";

//TODO FETCH DATA BASED ON CARD ID AND LIT ID
const checklistData: ChecklistType[] = [
  // {
  //   id: "1",
  //   title: "To do task1",
  //   isCompleted: true,
  // },
  // {
  //   id: "2",
  //   title: "To do task2",
  //   isCompleted: true,
  // },
  // {
  //   id: "3",
  //   title: "To do task3",
  //   isCompleted: false,
  // },
  // {
  //   id: "3",
  //   title: "To do task3",
  //   isCompleted: false,
  // },
  // {
  //   id: "4",
  //   title: "To do task3",
  //   isCompleted: false,
  // },
];

type Props = {
  cardId: string;
  listId: string | undefined;
};
export function ChecklistList({ cardId, listId }: Props) {
  const { setSelectTab } = useStore();

  function handleSelectChecklist(id: string) {
    // api req with list id and task id
  }

  function handleDeleteChecklist(id: string) {}

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <CheckSquare />
        <p className="text-xl font-medium">Checklist</p>
      </div>
      <div className="overflow-y-auto h-45">
        <Spacer size={4} />

        {checklistData.length === 0 ? (
          <IconButton
            onClick={() => setSelectTab("checklist")}
            classNameChildren="flex items-center gap-2 text-gray-300"
            title="Add an item"
            aria-label="Add an item"
          >
            <Plus />
            <p className="text-sm ">Add an item</p>
          </IconButton>
        ) : (
          <>
            <ProgressBar
              percentage={Math.round(
                (checklistData?.filter((item) => item.isCompleted).length /
                  checklistData.length) *
                  100
              )}
            />
            <Spacer size={4} />
            <div className="flex flex-col gap-3">
              {checklistData.map((item) => (
                <ChecklistCard
                  key={item.id}
                  data={item}
                  handleDeleteChecklist={() => handleDeleteChecklist(item.id)}
                  handleSelectChecklist={() => handleSelectChecklist(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
