import { IconButton } from "@/components/ui/iconButton";
import { duedateStatusColors } from "@/lib/dueDateStatusColors";
import { cn } from "@/lib/utils";
import { differenceInDays, differenceInHours } from "date-fns";
import { Clock, X } from "lucide-react";

type Props = {
  dueDate: string;
  disabled?: boolean;
  handleDeleteDialogOpen: () => void;
};
export function DueDateCard({
  dueDate,
  disabled,
  handleDeleteDialogOpen,
}: Props) {
  const now = new Date();
  const date = new Date(dueDate);

  const dInDaysData = differenceInDays(new Date(date), now);
  const dInHoursData = differenceInHours(new Date(date), now);

  return (
    <div
      className={cn(
        duedateStatusColors({
          status:
            dInDaysData < 0 && dInHoursData < 0
              ? "expired"
              : dInDaysData === 0 //24hrs
                ? "today"
                : "future",
        }),
        "p-1.5 px-2 rounded-md  flex items-center justify-between",
      )}
    >
      <div className=" flex items-center gap-2">
        <Clock />
        {dueDate}
      </div>
      <IconButton
        disabled={disabled}
        title="Delete due date"
        aria-label="Delete due date"
        onClick={handleDeleteDialogOpen}
      >
        <X />
      </IconButton>
    </div>
  );
}
