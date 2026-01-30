"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronDownIcon, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DueDateCard } from "./DueDateCard";
import { DueDateSkeleton } from "./DueDateSkeleton";
import { DueDate } from "@/lib/generated/prisma/client";

import dynamic from "next/dynamic";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);
type Props = {
  data: DueDate[] | undefined;
  cardId: string | undefined;
  listId: string | undefined;
};

function parseDate(date: string, time: string): string {
  const dateData = new Date(date);
  const timeData = new Date(time);
  return `${dateData.getFullYear()}-${dateData.getMonth() + 1 > 10 ? dateData.getMonth() + 1 : `0${dateData.getMonth() + 1}`}-${dateData.getDate()} ${timeData.getHours() > 10 ? timeData.getHours() : `0${timeData.getHours()}`}:${timeData.getMinutes() > 10 ? timeData.getMinutes() : `0${timeData.getMinutes()}`}`;
}
export function DueDateInputs({ data }: Props) {
  const dateData = "2026-01-31T12:00:00.000Z";
  const timeData = "2026-02-13T10:00:00.000Z";

  const dbDueDate = parseDate(dateData, timeData);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [addDateInput, setAddDateInput] = useState(false);

  const [open, setOpen] = useState(false);

  function handleAddDueDate() {
    const dateData = format(date, "yyyy-MM-dd");
    setDueDate(`${dateData} ${time}`);
    // TODO. api req with selected date and time
    // and show it the result below
  }

  function handleOpenDateInput() {
    setAddDateInput(true);
  }
  function handleCloseDateInput() {
    setAddDateInput(false);
  }

  function handleDeleteDuedate() {
    setDueDate("");
    setDeleteDialogOpen(false);
  }

  if (!data) return <DueDateSkeleton />;
  return (
    <div className="h-20">
      {!addDateInput && (
        <div className="flex gap-4 flex-col ">
          <Button
            className="w-full"
            onClick={handleOpenDateInput}
            variant={"secondary"}
            title="Open Date and Time picker"
            aria-label="Open Date and Time picker"
          >
            <div className="flex items-center justify-center gap-2">
              Add
              <Plus size={24} />
            </div>
          </Button>
        </div>
      )}

      {addDateInput && (
        <>
          {dbDueDate || dueDate ? (
            <DueDateCard
              dueDate={dueDate || dbDueDate}
              handleDeleteDialogOpen={() => setDeleteDialogOpen(true)}
            />
          ) : (
            <div className="flex justify-between gap-2 flex-col">
              <div className="flex justify-end gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className=" flex justify-between items-center font-normal w-33"
                    >
                      <div className="flex justify-between items-center font-normal ">
                        <p>
                          {date ? date.toLocaleDateString() : "Select date"}
                        </p>
                        <ChevronDownIcon />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0 "
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        if (!date) return;
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  onChange={(v) => {
                    setTime(v.target.value);
                  }}
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant={"secondary"}
                  onClick={handleAddDueDate}
                  title="Add due date"
                  aria-label="Add due date"
                >
                  <Plus />
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={handleCloseDateInput}
                  title="Cancel due date"
                  aria-label="Cancel due date"
                >
                  <X />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDeleteDuedate}
      />
    </div>
  );
}
