import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, Info, X } from "lucide-react";
import { LIST_OPTIONS } from "@/lib/consts";
import { Separator } from "@radix-ui/react-separator";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { copyListAction, deleteListAction } from "@/app/actions/list";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { deleteFile } from "@/lib/deleteFile";
import dynamic from "next/dynamic";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  listId: string;
};
export function ListOptions({ listId }: Props) {
  const pathname = usePathname();
  const boardId = pathname.split("/").at(-1) || "";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);
  const { setOpenTitleInput, setOpenNewCardInput } = useStore();

  const { mutate: mutateDeleteList, isPending: isPendingDeleteList } =
    useMutation({
      mutationKey: ["delete-list"],
      mutationFn: deleteListAction,
      onSuccess: () => {
        toast.dismiss("delete-list");
        toast.success("List deleted");
        setDeleteDialogOpen(false);
      },
      onError: () => {
        toast.dismiss("delete-list");
        toast.error("Error deleting list, please try again");
      },
    });

  const { mutate: mutateCopyList, isPending: isPendingCopyList } = useMutation({
    mutationFn: copyListAction,
    onSuccess: () => {
      toast.dismiss("copy-list");
      toast.success("List copied");
      setDeleteDialogOpen(false);
    },
    onError: () => {
      toast.dismiss("copy-list");
      toast.error("Error copying list, please try again");
    },
  });

  function handleCopyList() {
    mutateCopyList({ listId, boardId });
    toast.loading("Copying list...", { id: "copy-list" });
  }

  function handleSelectOption(
    option: "edit-list-title" | "delete-list" | "add-card" | "copy-list",
  ) {
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
      case "copy-list":
        handleCopyList();
        break;
      default:
        break;
    }
  }

  function handleModalDeleteList() {
    setDeleteDialogOpen(true);
  }
  // TODO add delete board api request
  async function handleDeleteList(listId: string) {
    await deleteFile(
      { type: "list", listId, fileType: "raw", boardId },
      boardId,
    ); //js will await until this fn is resolved before moving to next line and deleting the card

    mutateDeleteList({ listId, boardId });
    toast.loading("Deleting list...", { id: "delete-list" });
    setDeleteDialogOpen(false);
  }
  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild>
        <IconButton aria-label="List options" title="List options">
          <Ellipsis size={25} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50">
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
                    disabled={isPendingDeleteList || isPendingCopyList}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => handleSelectOption(option.value)}
                    className="p-2 w-full"
                    classNameChildren="flex gap-2 items-center"
                  >
                    {option.icon}
                    <p key={option.label}>{option.label}</p>
                  </IconButton>
                </React.Fragment>
              );
            }
            if (option.value === "copy-list") {
              // COPY BUTTON
              return (
                <React.Fragment key={option.value}>
                  <IconButton
                    disabled={isPendingDeleteList || isPendingCopyList}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => handleSelectOption(option.value)}
                    key={option.value}
                    className="p-2 w-full"
                    classNameChildren="flex gap-2 items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <p key={option.label}>{option.label}</p>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild className=" text-gray-400">
                        <Info />
                      </TooltipTrigger>
                      <TooltipContent className="min-w-20 max-w-80 flex flex-col gap-1">
                        <p className="text-base">
                          New List will include cloned values:
                        </p>

                        <p className="text-base">From List:</p>
                        <strong>Title , Status , Cards.</strong>

                        <p className="text-base"> From Cards: </p>
                        <strong>Title, Description, Checklist.</strong>
                      </TooltipContent>
                    </Tooltip>
                  </IconButton>
                </React.Fragment>
              );
            }
            return (
              <IconButton
                disabled={isPendingDeleteList || isPendingCopyList}
                aria-label={option.label}
                title={option.label}
                onClick={() => handleSelectOption(option.value)}
                key={option.value}
                className="p-2 w-full"
                classNameChildren="flex gap-2 items-center"
              >
                {option.icon}
                <p key={option.label}>{option.label}</p>
              </IconButton>
            );
          })}
        </div>

        {/* MODAL DELETE BOARD */}
        <DeleteDialog
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleDelete={() => handleDeleteList(listId)}
        />
      </PopoverContent>
    </Popover>
  );
}
