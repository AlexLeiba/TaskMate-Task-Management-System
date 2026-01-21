import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
import { differenceInDays } from "date-fns";
import { Clock, X } from "lucide-react";
import React from "react";

type Props = {
  dueDate: string;
  date: Date;
  handleDeleteDialogOpen: () => void;
};
export function DueDateCard({ dueDate, date, handleDeleteDialogOpen }: Props) {
  const now = new Date();

  if (differenceInDays(now, date) <= 1) {
  }

  return (
    <div
      className={cn(
        differenceInDays(date, now) === 0 ? "bg-red-800" : "bg-gray-600",
        "p-1.5 px-2 rounded-md  flex items-center justify-between",
      )}
    >
      <div className=" flex items-center gap-2">
        <Clock />
        {dueDate}
      </div>
      <IconButton
        title="Delete due date"
        aria-label="Delete due date"
        onClick={handleDeleteDialogOpen}
      >
        <X />
      </IconButton>
    </div>
  );
}
