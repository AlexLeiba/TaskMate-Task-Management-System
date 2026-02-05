"use client";
import { Spacer } from "@/components/ui/spacer";
import { Grid } from "lucide-react";
import { BoardCard } from "./BoardCard";
import { CreateNewBoardCard } from "./CreateNewBoard/CreateNewBoardCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBoardAction } from "@/app/actions/dashboard";
import toast from "react-hot-toast";
import { BoardType } from "@/lib/types";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "@/lib/deleteFile";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

export function Boards({
  data,
}: {
  data: { error: { message: string }; data: BoardType[] };
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBoardToDelete, setSelectedBoardToDelete] = useState("");

  useEffect(() => {
    if (data.error.message) {
      toast.error(data.error.message);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-board"],
    mutationFn: deleteBoardAction,
    onSuccess: () => {
      toast.dismiss("delete-board");
      toast.success("Board deleted successfully");
    },
    onError: ({ message }) => {
      console.log("🚀 ~ Boards ~ message:", message);
      toast.dismiss("delete-board");
      toast.error(message || "Error deleting board");
    },
  });

  function handleSelectBoard(boardId: string) {
    router.push(`/board/${boardId}`);
  }
  function handleOpenModalDeleteBoard(boardId: string) {
    setDeleteDialogOpen(true);
    setSelectedBoardToDelete(boardId);
  }

  async function handleDeleteBoard(boardId: string) {
    await deleteFile({ type: "board", fileType: "raw", boardId }, boardId); //js will await until this fn is resolved before moving to next line and deleting the card

    mutate(boardId);
    setDeleteDialogOpen(false);
    toast.loading("Deleting board...", { id: "delete-board" });
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Grid />
        <p className="text-xl font-medium">Boards</p>
      </div>
      <Spacer size={4} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-2">
        {/* CREATE NEW BOARD */}
        <CreateNewBoardCard disabled={isPending} />

        {/* BOARDS */}
        {data.data?.map((board) => (
          <div key={board.id}>
            <BoardCard
              disabled={isPending}
              data={board}
              handleModalDeleteBoard={() =>
                handleOpenModalDeleteBoard(board.id)
              }
              handleSelectBoard={() => handleSelectBoard(board.id)}
            />
          </div>
        ))}
      </div>
      {/* MODAL DELETE BOARD */}
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={() => {
          if (!selectedBoardToDelete) {
            toast.error("Please select a board to delete");
          }
          handleDeleteBoard(selectedBoardToDelete);
        }}
      />
    </div>
  );
}
