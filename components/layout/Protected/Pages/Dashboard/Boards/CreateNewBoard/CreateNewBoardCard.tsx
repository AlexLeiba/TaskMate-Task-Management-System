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
import { useState } from "react";

import { IconButton } from "@/components/ui/iconButton";
import DialogBoardDetails from "./DialogBoardDetails";
import { getUnsplashImagesAction } from "@/app/actions/unsplash-images";

export function CreateNewBoardCard() {
  const [isNewBoardDialogOpen, setIsNewBoardDialogOpen] = useState(false);
  // TODO add api and UI for create card modal
  // API with input board title and url image'

  async function handleGetNewImages() {
    const images = await getUnsplashImagesAction();
    console.log("🚀 ~ handleGetNewImages ~ images:", images);
  }

  return (
    <>
      <IconButton
        classNameChildren="group flex flex-col w-full justify-center items-center "
        onClick={() => setIsNewBoardDialogOpen(true)}
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
      <Dialog
        open={isNewBoardDialogOpen}
        onOpenChange={setIsNewBoardDialogOpen}
      >
        <DialogContent className="lg:min-w-200!">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create new board</DialogTitle>
          </DialogHeader>

          <DialogBoardDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
