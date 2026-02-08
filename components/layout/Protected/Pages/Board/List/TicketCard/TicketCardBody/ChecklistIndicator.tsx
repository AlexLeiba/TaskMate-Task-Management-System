import { checklistStatusColors } from "@/lib/checklistStatusColors";
import { Checklist } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { CheckSquare } from "lucide-react";

type Props = {
  data: Checklist[];
};
export function ChecklistIndicator({ data }: Props) {
  if (!data || data?.length === 0) return null;

  const totalItems = data.length;
  const checkedItems = data.filter((item) => item.isCompleted).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);
  return (
    <div
      className={cn(
        checklistStatusColors({ status: percentage >= 50 }),
        "flex items-center gap-1 rounded-md px-2",
      )}
    >
      <CheckSquare size={20} />
      <p className="text-xs">{`${checkedItems} / ${totalItems}`}</p>
    </div>
  );
}
