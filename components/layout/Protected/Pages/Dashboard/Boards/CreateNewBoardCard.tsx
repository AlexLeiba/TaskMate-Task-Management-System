"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { IconButton } from "@/components/ui/iconButton";
import { NewBoardImagePicker } from "./NewBoardImagePicker";

export function CreateNewBoardCard() {
  const [isNewBoardDialogOpen, setIsNewBoardDialogOpen] = useState(false);
  // TODO add api and UI for create card modal
  return (
    <>
      <IconButton
        classNameChildren="group flex flex-col w-full justify-center items-center"
        onClick={() => setIsNewBoardDialogOpen(true)}
        title="Create new board"
        aria-label="Create new board"
        className="relative group   rounded-md p-2 h-28  overflow-hidden  hover:bg-gray-500  bg-gray-200 hover:text-white"
      >
        <p className="text-xl">Create new board</p>

        <Plus className="size-10  p-1 z-20  text-gray-700 group-hover:text-white" />

        <p className="w-full text-right">5 remained</p>

        <Tooltip>
          <TooltipTrigger
            asChild
            className="absolute right-2 top-50% text-gray-400"
          >
            <Info />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-base">Free workspaces can have up to 5 boards</p>
            <p className="text-base">
              for unlimited boards upgrade to a paid plan.
            </p>
          </TooltipContent>
        </Tooltip>
      </IconButton>

      {/* DIALOG CREATE NEW BOARD */}
      <Dialog
        open={isNewBoardDialogOpen}
        onOpenChange={setIsNewBoardDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">New board</DialogTitle>
          </DialogHeader>

          <NewBoardImagePicker />

          <DialogFooter className="flex ">
            <Button
              size={"lg"}
              type="button"
              variant="tertiary"
              className="w-full"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
