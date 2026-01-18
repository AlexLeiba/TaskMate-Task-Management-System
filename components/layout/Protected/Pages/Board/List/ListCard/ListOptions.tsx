import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, X } from "lucide-react";
import { LIST_OPTIONS } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import React from "react";

type Props = {
  listId: string;
};
export function ListOptions({ listId }: Props) {
  const { setOpenTitleInput, setOpenNewCardInput } = useStore();
  // get list id here TODO
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [option, setOption] = useState("");
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);

  function handleSelectOption(option: string) {
    // TODO api req with new status
    // If success show optimistic status
    setOption(option);
    // setIsOpenedStatus(false);

    switch (option) {
      case "edit-list-title":
        setOpenTitleInput({ id: listId, isOpen: true });
        break;
      case "delete-list":
        handleModalDeleteList();
        break;
      case "add-card":
        setOpenNewCardInput({ id: listId, isOpen: true });
        break;
      default:
        break;
    }
  }

  function handleModalDeleteList() {
    setDeleteDialogOpen(true);
  }
  // TODO add delete board api request
  function handleDeleteList(listId: string) {
    console.log("🚀 ~ handleDeleteList ~ listId:", listId);
  }
  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild>
        <IconButton aria-label="List options" title="List options">
          <Ellipsis size={25} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-medium">List Options</p>
          <IconButton
            onClick={() => setIsOpenedStatus(false)}
            title="Close list status"
            aria-label="Close list status"
          >
            <X />
          </IconButton>
        </div>

        <div className="flex flex-col items-start ">
          {LIST_OPTIONS.map((option) => {
            if (option.value === "delete-list") {
              // DELETE BUTTON
              return (
                <React.Fragment key={option.value}>
                  <Separator className="my-4 w-full h-px bg-gray-700" />
                  <IconButton
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => handleSelectOption(option.value)}
                    className="p-2 "
                    classNameChildren="flex gap-2 items-center"
                  >
                    {option.icon}
                    <p key={option.label}>{option.label}</p>
                  </IconButton>
                </React.Fragment>
              );
            }
            return (
              <IconButton
                aria-label={option.label}
                title={option.label}
                onClick={() => handleSelectOption(option.value)}
                key={option.value}
                className="p-2"
                classNameChildren="flex gap-2 items-center"
              >
                {option.icon}
                <p key={option.label}>{option.label}</p>
              </IconButton>
            );
          })}
        </div>

        {/* MODAL DELETE BOARD */}
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
                <Button size={"lg"} type="button" variant="default">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                size={"lg"}
                type="button"
                variant="destructive"
                onClick={() => handleDeleteList(listId)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
