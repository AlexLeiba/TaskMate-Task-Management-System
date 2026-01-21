"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronDownIcon, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KEYBOARD } from "@/lib/consts";
import { DueDateCard } from "./DueDateCard";
import { DueDateType } from "@/lib/types";
import { DueDateSkeleton } from "./DueDateSkeleton";
type Props = {
  data: DueDateType | undefined;
};
export function DueDateInputs({ data }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const [open, setOpen] = useState(false);

  function handleAddDueDate() {
    const dateData = format(date, "yyyy-MM-dd");
    setDueDate(`${dateData} ${time}`);
    // TODO. api req with selected date and time
    // and show it the result below
  }

  function handleDeleteDuedate() {
    setDueDate("");
    setDeleteDialogOpen(false);
  }

  if (!data) return <DueDateSkeleton />;
  return (
    <div>
      {!dueDate && (
        <div className="flex gap-4 ">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
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
          <Button
            onClick={handleAddDueDate}
            variant={"secondary"}
            title="Add due date"
            aria-label="Add due date"
          >
            Add
            <Plus size={24} />
          </Button>
        </div>
      )}

      {dueDate && (
        <DueDateCard
          date={date}
          dueDate={dueDate}
          handleDeleteDialogOpen={() => setDeleteDialogOpen(true)}
        />
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-xl">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex ">
            <DialogClose asChild>
              <Button
                size={"lg"}
                type="button"
                variant="default"
                onClick={(e) => e.stopPropagation()}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size={"lg"}
              type="button"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteDuedate();
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  handleDeleteDuedate();
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
