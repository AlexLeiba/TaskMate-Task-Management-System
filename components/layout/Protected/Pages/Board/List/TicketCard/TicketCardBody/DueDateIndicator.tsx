"use cl;ient";
import { duedateStatusColors } from "@/lib/dueDateStatusColors";
import { DueDate } from "@/lib/generated/prisma/client";
import { isValidDateString } from "@/lib/isValidDateString";
import { parseDateTimeToLocal } from "@/lib/parseDateTimeToLocal";
import { cn } from "@/lib/utils";
import { differenceInDays, differenceInHours, format } from "date-fns";
import { Clock10 } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  data: DueDate | undefined;
};
export function DueDateIndicator({ data }: Props) {
  if (!data || !data.date || !data.time) return null;

  const isValidDate =
    isValidDateString(data.date) && isValidDateString(data.time);

  if (!isValidDate) {
    return toast.error("Invalid date or time, please try again");
  }

  const dueDate = parseDateTimeToLocal(data.date, data.time);
  const date = new Date(dueDate);

  const formattedDate = format(new Date(dueDate), "MMM dd");
  const dInDaysData = differenceInDays(new Date(date), new Date());
  const dInHoursData = differenceInHours(new Date(date), new Date());

  return (
    <div
      className={cn(
        "px-2 rounded-md flex items-center gap-1",
        duedateStatusColors({
          status:
            dInDaysData < 0 && dInHoursData < 0
              ? "expired"
              : dInDaysData === 0
                ? "today"
                : "future",
        }),
      )}
    >
      <Clock10 size={20} />
      {formattedDate}
    </div>
  );
}
