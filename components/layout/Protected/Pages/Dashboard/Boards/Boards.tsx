"use client";
import { Spacer } from "@/components/ui/spacer";
import { Grid } from "lucide-react";
import { BoardCard } from "./BoardCard";
import { CreateNewBoardCard } from "./CreateNewBoard/CreateNewBoardCard";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BoardCardSkeleton } from "./BoardCardSkeleton";
import { deleteBoardAction } from "@/app/actions/dashboard";
import toast from "react-hot-toast";
import { BoardType } from "@/lib/types";

export function Boards({ data }: { data: BoardType[] }) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  function handleSelectBoard(boardId: string) {
    router.push(`/board/${boardId}`);
  }
  function handleOpenModalDeleteBoard() {
    setDeleteDialogOpen(true);
  }

  async function handleDeleteBoard(boardId: string) {
    setDeleteDialogOpen(false);
    const response = await deleteBoardAction(boardId);
    if (response.error.message) return toast.error(response.error.message);

    toast.success("Board deleted successfully");
  }

  if (!data)
    return (
      <>
        <div className="flex gap-2 items-center">
          <Grid />
          <p className="text-xl font-medium">Boards</p>
        </div>
        <Spacer size={4} />
        <BoardCardSkeleton />
      </>
    );
  return (
    <div>
      <div className="flex gap-2 items-center">
        <Grid />
        <p className="text-xl font-medium">Boards</p>
      </div>
      <Spacer size={4} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-2">
        {/* CREATE NEW BOARD */}
        <CreateNewBoardCard />

        {/* BOARDS */}
        {data?.map((board) => (
          <div key={board.id}>
            <BoardCard
              data={board}
              handleModalDeleteBoard={handleOpenModalDeleteBoard}
              handleSelectBoard={() => handleSelectBoard(board?.id)}
            />

            {/* MODAL DELETE BOARD */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="text-xl">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
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
                    onClick={() => handleDeleteBoard(board.id)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
