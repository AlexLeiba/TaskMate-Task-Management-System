import { IconButton } from "@/components/ui/iconButton";
import { DATE_FORMAT } from "@/lib/consts/consts";
import { duedateStatusColors } from "@/lib/color-variants/dueDateStatusColors";
import { cn } from "@/lib/utils";
import { differenceInDays, differenceInHours, format } from "date-fns";
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

  const formatedDate = format(new Date(dueDate), DATE_FORMAT);

  return (
    <div
      className={cn(
        duedateStatusColors({
          status:
            dInDaysData < 0 && dInHoursData < 0
              ? "expired"
              : dInDaysData === 0
                ? "today"
                : "future",
        }),
        "p-1.5 px-2 rounded-md  flex items-center justify-between",
      )}
    >
      <div className=" flex items-center gap-2">
        <Clock />
        {formatedDate}
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
