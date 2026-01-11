"use client";
import { Spacer } from "@/components/ui/spacer";
import { Grid } from "lucide-react";
import { BoardCard } from "./BoardCard";
import { CreateNewBoardCard } from "./CreateNewBoardCard";

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
import { BoardType } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
  data: BoardType[];
};
export function Boards({ data: boardData }: Props) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  function handleSelectBoard(boardId: string) {
    console.log("first");
    router.push(`/board/${boardId}`);
  }
  function handleModalDeleteBoard() {
    setDeleteDialogOpen(true);
  }
  // TODO add delete board request
  function handleDeleteBoard(boardId: string) {}
  return (
    <div>
      <div className="flex gap-2 items-center">
        <Grid />
        <p className="text-xl font-medium">Boards</p>
      </div>
      <Spacer size={4} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2">
        {/* CREATE NEW BOARD */}
        <CreateNewBoardCard />

        {/*CREATED BOARDS */}
        {boardData.map((board) => (
          <div key={board.id}>
            <BoardCard
              data={board}
              handleModalDeleteBoard={handleModalDeleteBoard}
              handleSelectBoard={() => handleSelectBoard(board.id)}
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
