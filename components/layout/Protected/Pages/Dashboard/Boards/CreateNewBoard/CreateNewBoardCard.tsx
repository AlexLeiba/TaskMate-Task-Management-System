"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/iconButton";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";

const DialogBoardDetails = dynamic(() =>
  import("./DialogBoardDetails").then((m) => m.DialogBoardDetails),
);

const CreateNewBoardDialog = dynamic(() =>
  import("./CreateNewBoardDialog").then((m) => m.CreateNewBoardDialog),
);

type Props = {
  disabled?: boolean;
};
export function CreateNewBoardCard({ disabled = false }: Props) {
  const { newBoardDialogOpen, setNewBoardDialogOpen } = useStore();

  return (
    <>
      {/* CREATE CARD */}
      <IconButton
        disabled={disabled}
        classNameChildren="group flex flex-col w-full justify-center items-center "
        onClick={() => setNewBoardDialogOpen(true)}
        title="Create new board"
        aria-label="Create new board"
        className="relative group   rounded-md p-2  overflow-hidden text-black  hover:bg-gray-500  bg-gray-200 hover:text-white md:max-w-72.5 w-full"
      >
        <p className="text-xl ">Create new board</p>

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
      <CreateNewBoardDialog
        newBoardDialogOpen={newBoardDialogOpen}
        setNewBoardDialogOpen={setNewBoardDialogOpen}
      >
        <DialogBoardDetails />
      </CreateNewBoardDialog>
      {/* CREATE CARD FORM */}
    </>
  );
}
