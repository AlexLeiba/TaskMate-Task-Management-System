"use client";
import { Spacer } from "@/components/ui/spacer";
import { Grid } from "lucide-react";
import { BoardCard } from "./BoardCard";
import { CreateNewBoardCard } from "./CreateNewBoard/CreateNewBoardCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoardCardSkeleton } from "./BoardCardSkeleton";
import { deleteBoardAction } from "@/app/actions/dashboard";
import toast from "react-hot-toast";
import { BoardType } from "@/lib/types";
import dynamic from "next/dynamic";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

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
            <DeleteDialog
              deleteDialogOpen={deleteDialogOpen}
              setDeleteDialogOpen={setDeleteDialogOpen}
              handleDelete={() => handleDeleteBoard(board?.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
