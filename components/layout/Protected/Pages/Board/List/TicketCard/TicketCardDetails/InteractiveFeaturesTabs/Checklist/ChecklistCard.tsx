import { Delete } from "lucide-react";
import { KEYBOARD } from "@/lib/consts";
import { IconButton } from "@/components/ui/iconButton";
import { Checkbox } from "@/components/ui/checkbox";
import { ChecklistType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  data: ChecklistType;
  handleSelectChecklist: (id: string) => void;
  handleDeleteChecklist: (id: string) => void;
};
export function ChecklistCard({
  data,
  handleSelectChecklist,
  handleDeleteChecklist,
}: Props) {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === KEYBOARD.ENTER) {
          handleSelectChecklist(data.id);
        }
      }}
      onClick={() => handleSelectChecklist(data.id)}
      key={data.id}
      className="flex items-center justify-between hover:opacity-70 cursor-pointer  group px-2"
    >
      <div
        className={cn(
          data.isCompleted ? "line-through" : "",
          "flex items-center gap-2"
        )}
      >
        <Checkbox checked={data.isCompleted} />
        <p>{data.title}</p>
      </div>
      <IconButton
        className="hidden group-hover:block group-focus-within:block"
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteChecklist(data.id);
        }}
      >
        <Delete />
      </IconButton>
    </div>
  );
}
