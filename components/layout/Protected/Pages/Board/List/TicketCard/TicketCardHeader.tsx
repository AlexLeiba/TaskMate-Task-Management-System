"use client";
import { useState } from "react";
import { Copy, Delete, Edit, Ellipsis, Info, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddNewInput } from "../../AddNewInput";
import { Separator } from "@/components/ui/separator";
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import {
  copyCardAction,
  deleteCardAction,
  editCardTitleAction,
} from "@/app/actions/card";
import toast from "react-hot-toast";
import { deleteFile } from "@/lib/deleteFile";
import { cn } from "@/lib/utils";
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
  title: string;
  cardId: string;
  listId: string;
  boardId: string;
  cardDetailsId: string;
};
export function TicketCardHeader({
  title,
  cardId,
  listId,
  boardId,
  cardDetailsId,
}: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  // DELETE CARD
  const {
    mutate: deleteCardMutation,
    isPending: isPendingDeleteCardDeleteCard,
  } = useMutation({
    mutationKey: ["delete-card"],
    mutationFn: deleteCardAction,
    onSuccess: () => {
      toast.dismiss("delete-card");
      toast.success("Card deleted");
    },
    onError: ({ message }) => {
      toast.dismiss("delete-card");
      toast.error(message || "Error deleting card, please try again");
    },
  });

  // EDIT TITLE
  const { mutate: editTitleCardMutation, isPending: isPendingEditTitleCard } =
    useMutation({
      mutationKey: ["edit-title-card"],
      mutationFn: editCardTitleAction,
      onSuccess: () => {
        toast.dismiss("edit-title-card");
        toast.success("Card title was edited");
      },
      onError: ({ message }) => {
        toast.dismiss("edit-title-card");
        toast.error(message || "Error editing card title, please try again");
      },
    });

  // COPY CARD
  const { mutate: copyCardMutation, isPending: isPendingCopyCard } =
    useMutation({
      mutationKey: ["copy-card"],
      mutationFn: copyCardAction,
      onSuccess: () => {
        toast.dismiss("copy-card");
        toast.success("Card was copied");
      },
      onError: ({ message }) => {
        toast.dismiss("copy-card");
        toast.error(message || "Error copying card, please try again");
      },
    });

  //HANDLE CHANGE TITLE
  function handleChangeCardTitle(title: { [inputName: string]: string }) {
    editTitleCardMutation({ title: title.title, cardId, listId, boardId });
    toast.loading("Editing card title...", { id: "edit-title-card" });
    setIsOpenedTitleInput(false);
    setIsOpenedOptions(false);
  }

  function handleOpenModalDeleteCard() {
    setDeleteDialogOpen(true);
  }

  async function handleDeleteCard(cardId: string) {
    toast.loading("Deleting card...", { id: "delete-card" });

    // DELETE FILES FROM CLOUD
    await deleteFile({ type: "card", cardDetailsId, fileType: "raw" }, boardId); //js will await until this fn is resolved before moving to next line and deleting the card

    // DELETE FILES FROM DB
    deleteCardMutation({ cardId, listId, boardId });

    setDeleteDialogOpen(false);
  }

  function handleCopyCard() {
    toast.loading("Copying card...", { id: "copy-card" });
    copyCardMutation({ cardId, listId, boardId });
    setIsOpenedOptions(false);
  }
  return (
    <div className="flex justify-between w-full relative">
      <h4 className="text-lg font-medium pr-6 line-clamp-2">{title}</h4>

      {/* OPTIONS  */}
      <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
        <PopoverTrigger asChild>
          <IconButton
            className={cn(
              "absolute top-0 right-0",
              isOpenedOptions ? "block" : "hidden group-hover:block",
            )}
            disabled={
              isPendingDeleteCardDeleteCard ||
              isPendingEditTitleCard ||
              isPendingCopyCard
            }
            title="Card options"
            aria-label="Card options"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
              }
            }}
          >
            <Ellipsis />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-70 ">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-medium">Card Options</p>
            <IconButton
              disabled={
                isPendingDeleteCardDeleteCard ||
                isPendingEditTitleCard ||
                isPendingCopyCard
              }
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenedOptions(false);
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  setIsOpenedOptions(false);
                }
              }}
              title="Close card options"
              aria-label="Close card options"
            >
              <X />
            </IconButton>
          </div>

          <div className="flex flex-col gap-2 items-start pl-2">
            {/* EDIT CARD TITLE*/}
            <AddNewInput
              disabled={
                isPendingDeleteCardDeleteCard ||
                isPendingEditTitleCard ||
                isPendingCopyCard
              }
              type="textarea"
              handleSubmitValue={(v) => handleChangeCardTitle(v)}
              inputName="title"
              placeholder="Edit card title here..."
              label="Edit card title"
              setIsOpenedTitleInput={setIsOpenedTitleInput}
              isOpenedTitleInput={isOpenedTitleInput}
              classNameContainer="p-0 mt-4 mb-2 w-full"
              buttonDirection="column"
              defaultValue={title}
            >
              <IconButton
                aria-label="Edit"
                title="Edit"
                classNameChildren="flex  gap-2 "
              >
                <Edit />
                <p>Edit card title</p>
              </IconButton>
            </AddNewInput>

            <IconButton
              disabled={
                isPendingDeleteCardDeleteCard ||
                isPendingEditTitleCard ||
                isPendingCopyCard
              }
              onClick={(e) => {
                e.stopPropagation();
                handleCopyCard();
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  handleCopyCard();
                }
              }}
              aria-label="Copy"
              title="Copy"
              classNameChildren="flex  justify-between items-center"
              className="w-full py-2"
            >
              <div className="flex gap-2 items-center">
                <Copy size={20} /> Copy
              </div>
              <Tooltip>
                <TooltipTrigger asChild className=" text-gray-400">
                  <Info />
                </TooltipTrigger>
                <TooltipContent className="min-w-20 max-w-90 flex flex-col gap-1">
                  <p className="text-base">
                    New card will include cloned values:
                  </p>

                  <strong> Title , Description , Checklist </strong>
                </TooltipContent>
              </Tooltip>
            </IconButton>

            <Separator className="my-4 bg-gray-700" />

            <IconButton
              disabled={
                isPendingDeleteCardDeleteCard ||
                isPendingEditTitleCard ||
                isPendingCopyCard
              }
              aria-label="Delete card"
              title="Delete card"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalDeleteCard();
              }}
              classNameChildren="flex  gap-2 items-center "
              className="w-full"
            >
              <Delete /> Delete
            </IconButton>
          </div>
        </PopoverContent>
      </Popover>
      {/* DELETE CARD DIALOG */}

      <DeleteDialog
        loading={isPendingDeleteCardDeleteCard}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={() => handleDeleteCard(cardId)}
      />
    </div>
  );
}
