import { duedateStatusColors } from "@/lib/dueDateStatusColors";
import { DueDate } from "@/lib/generated/prisma/client";
import { parseDateTimeToLocal } from "@/lib/parseDateTimeToLocal";
import { cn } from "@/lib/utils";
import { differenceInDays, differenceInHours, format } from "date-fns";
import { Clock10 } from "lucide-react";

type Props = {
  data: DueDate | undefined;
};
export function DueDateIndicator({ data }: Props) {
  if (!data || !data.date || !data.time) return null;

  //   TODO check if type of data is date
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
