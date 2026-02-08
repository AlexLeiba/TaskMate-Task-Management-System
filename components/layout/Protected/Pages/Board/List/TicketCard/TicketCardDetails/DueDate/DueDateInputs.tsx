"use client";
import { useEffect, useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDueDateAction,
  deleteDueDateAction,
} from "@/app/actions/card-details";
import toast from "react-hot-toast";
import { useBoardId } from "@/hooks/useBoardId";

import { parseDateTimeToLocal } from "@/lib/parseDateTimeToLocal";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  data: DueDate[] | undefined;
  cardDetailsId: string | undefined;
};

export function DueDateInputs({ data, cardDetailsId }: Props) {
  const boardId = useBoardId();
  const queryClient = useQueryClient();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("00:00:00");
  const [dueDate, setDueDate] = useState<string>("");
  const [addDateInput, setAddDateInput] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data?.[0]?.id) {
      const { time, date } = data[0];
      const parsedDateWithTime = parseDateTimeToLocal(date, time);

      const formatedDate = format(parsedDateWithTime, "yyyy-MM-dd, HH:mm");

      // eslint-disable-next-line react-hooks/exhaustive-deps
      setDueDate(formatedDate);
      setAddDateInput(true);
    }
  }, [data]);

  const { isPending: isPendingCreate, mutate: mutateCreateDueDate } =
    useMutation({
      mutationFn: createDueDateAction,
      mutationKey: ["create-due-date"],
      onSuccess: () => {
        toast.dismiss("create-due-date");
        toast.success("Due date created", { id: "create-due-date" });
        queryClient.invalidateQueries({ queryKey: ["card-details"] });
      },
      onError: ({ message }) => {
        setDueDate("");
        toast.dismiss("create-due-date");
        toast.error(message || "Error creating due date, please try again");
      },
    });
  const { isPending: isPendingDelete, mutate: mutateDeleteDueDate } =
    useMutation({
      mutationFn: deleteDueDateAction,
      mutationKey: ["delete-due-date"],
      onSuccess: () => {
        toast.dismiss("delete-due-date");
        toast.success("Due date Deleted", { id: "delete-due-date" });
        queryClient.invalidateQueries({ queryKey: ["card-details"] });
      },
      onError: ({ message }) => {
        toast.dismiss("delete-due-date");
        toast.error(message || "Error deleting due date, please try again");
      },
    });

  if (!cardDetailsId) return <DueDateSkeleton />;

  function handleAddDueDate() {
    const timeString = `2026-01-01T${time}`;
    const timeInUTC = new Date(timeString).toISOString();
    const dateUTC = date.toISOString();

    mutateCreateDueDate({
      cardDetailsId: cardDetailsId || "",
      date: dateUTC,
      time: timeInUTC,
      boardId,
    });

    toast.loading("Creating due date...", { id: "create-due-date" });

    const parsedDateWithTime = parseDateTimeToLocal(dateUTC, timeInUTC);

    const formatedDate = format(parsedDateWithTime, "yyyy-MM-dd, HH:mm");
    setDueDate(formatedDate);
  }

  function handleOpenDateInput() {
    setAddDateInput(true);
  }
  function handleCloseDateInput() {
    setAddDateInput(false);
  }

  function handleDeleteDuedate() {
    setDueDate("");
    setAddDateInput(false);
    setDeleteDialogOpen(false);
    if (data?.[0].id) {
      mutateDeleteDueDate({
        cardDetailsId: cardDetailsId || "",
        boardId,
        dueDateId: data[0].id,
      });
    } else {
      toast.error("Due date id not found, please try again");
    }
  }

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
          {dueDate ? (
            <DueDateCard
              disabled={isPendingCreate || isPendingDelete}
              dueDate={dueDate}
              handleDeleteDialogOpen={() => setDeleteDialogOpen(true)}
            />
          ) : (
            <div className="flex justify-between gap-2 flex-col">
              <div className="flex justify-end gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={isPendingCreate || isPendingDelete}
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
                      disabled={isPendingCreate || isPendingDelete}
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
                  disabled={isPendingCreate || isPendingDelete}
                  onChange={(v) => {
                    setTime(v.target.value);
                  }}
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="00:00:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  disabled={isPendingCreate || isPendingDelete}
                  variant={"secondary"}
                  onClick={handleAddDueDate}
                  title="Add due date"
                  aria-label="Add due date"
                >
                  <Plus />
                </Button>
                <Button
                  disabled={isPendingCreate || isPendingDelete}
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
