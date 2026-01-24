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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IconButton } from "@/components/ui/iconButton";
import DialogBoardDetails from "./DialogBoardDetails";
import { useStore } from "@/store/useStore";

export function CreateNewBoardCard() {
  const { newBoardDialogOpen, setNewBoardDialogOpen } = useStore();

  return (
    <>
      {/* CREATE CARD */}
      <IconButton
        classNameChildren="group flex flex-col w-full justify-center items-center "
        onClick={() => setNewBoardDialogOpen(true)}
        title="Create new board"
        aria-label="Create new board"
        className="relative group   rounded-md p-2  overflow-hidden text-black  hover:bg-gray-500  bg-gray-200 hover:text-white "
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
      <Dialog open={newBoardDialogOpen} onOpenChange={setNewBoardDialogOpen}>
        <DialogContent className="lg:min-w-200!">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create new board</DialogTitle>
          </DialogHeader>
          {/* CREATE CARD FORM */}
          <DialogBoardDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
