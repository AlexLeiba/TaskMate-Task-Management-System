"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Spacer } from "@/components/ui/spacer";
import { format } from "date-fns";
import { Calendar1Icon, ChevronDownIcon, Clock, Plus, X } from "lucide-react";
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
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts";

export function DueDate() {
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
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex items-center gap-2">
          <Calendar1Icon size={24} />
          <p className="text-xl font-medium text-nowrap">Due Date</p>
        </div>
      </div>
      <Spacer size={4} />
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
        <div className="p-2 px-2 rounded-md bg-gray-600 flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <Clock />
            {dueDate}
          </div>
          <IconButton
            title="Delete due date"
            aria-label="Delete due date"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <X />
          </IconButton>
        </div>
      )}

      {/* DELETE CARD DIALOG */}
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
