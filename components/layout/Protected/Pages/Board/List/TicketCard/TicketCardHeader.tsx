"use client";
import { MouseEvent, useState } from "react";
import { Copy, Delete, Edit, Ellipsis, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddNewInput } from "../../AddNewInput";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts";

type Props = {
  title: string;
  cardId: string;
};
export function TicketCardHeader({ title, cardId }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  function handleChangeCardTitle(title: { [inputName: string]: string }) {
    // TODO api req to change card title
    console.log("New card title:", title, "cardId", cardId);
  }

  function handleOpenModalDeleteCard() {
    setDeleteDialogOpen(true);
  }
  // TODO add delete Card api request
  function handleDeleteCard(cardId: string) {
    console.log("🚀 ~ handleDeleteCard ~ cardId:", cardId);
  }

  function handleCopyCard() {
    console.log("Copy card:", cardId);
  }
  return (
    <div className="flex justify-between w-full">
      <p className="text-lg font-medium">{title}</p>

      {/* OPTIONS  */}
      <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
        <PopoverTrigger asChild>
          <IconButton
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
        <PopoverContent
          align="start"
          className="max-w-70 bg-gray-900 text-white"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-medium">Card Options</p>
            <IconButton
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
              type="textarea"
              handleSubmitValue={(v) => handleChangeCardTitle(v)}
              inputName="title"
              placeholder="Edit card title here..."
              label="Edit card title"
              setIsOpenedTitleInput={setIsOpenedTitleInput}
              isOpenedTitleInput={isOpenedTitleInput}
              classNameContainer="p-0 mt-4 mb-2 w-full"
              buttonDirection="column"
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
              classNameChildren="flex  gap-2 items-center"
            >
              <Copy /> Copy
            </IconButton>
            <Separator className="my-4 bg-gray-700" />

            <IconButton
              aria-label="Delete card"
              title="Delete card"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalDeleteCard();
              }}
              classNameChildren="flex  gap-2 items-center "
            >
              <Delete /> Delete
            </IconButton>
          </div>
        </PopoverContent>
      </Popover>
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
                handleDeleteCard(cardId);
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  handleDeleteCard(cardId);
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
