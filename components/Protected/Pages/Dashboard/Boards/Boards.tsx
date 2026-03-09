"use client";
import { Spacer } from "@/components/ui/spacer";
import { LayoutDashboard } from "lucide-react";
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
import { useAuth } from "@clerk/nextjs";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts";

const DeleteDialog = dynamic(() =>
  import("@/components/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

export function Boards({
  data,
}: {
  data: { error: { message: string }; data: BoardType[] };
}) {
  const { orgId } = useAuth();
  const role = useRole();

  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBoardToDelete, setSelectedBoardToDelete] = useState("");

  useEffect(() => {
    if (data.error.message) {
      toast.error(data.error.message);
    }
  }, [data.error]);

  const { mutate: mutateDeleteBoard, isPending: isDeletePending } = useMutation(
    {
      mutationKey: ["delete-board"],
      mutationFn: deleteBoardAction,
      onMutate: async (boardId) => {
        await deleteFile({ type: "board", fileType: "raw", boardId }, boardId); //await deletion of all files from cloud from the board before deleting the board itself
      },
      onSuccess: () => {
        setDeleteDialogOpen(false);
        toast.dismiss("delete-board");
        toast.success("Board deleted successfully");
      },
      onError: ({ message }) => {
        setDeleteDialogOpen(false);
        toast.dismiss("delete-board");
        toast.error(message || "Error deleting board");
      },
    },
  );

  function handleSelectBoard(boardId: string) {
    router.push(`/dashboard/${orgId}/board/${boardId}`);
  }
  function handleOpenModalDeleteBoard(boardId: string) {
    setDeleteDialogOpen(true);
    setSelectedBoardToDelete(boardId);
  }

  async function handleDeleteBoard(boardId: string) {
    if (!selectedBoardToDelete) {
      toast.error("Please select a board to delete");
      return;
    }

    mutateDeleteBoard(boardId);

    toast.loading("Deleting board...", { id: "delete-board" });
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <LayoutDashboard />
        <p className="text-xl font-medium">Boards</p>
      </div>
      <Spacer size={4} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,243px))] gap-2">
        {/* CREATE NEW BOARD */}
        {role === USER_ROLES.admin && (
          <CreateNewBoardCard disabled={isDeletePending} />
        )}

        {/* BOARDS */}
        {data.data?.map((board) => (
          <BoardCard
            key={board.id}
            disabled={isDeletePending}
            data={board}
            handleModalDeleteBoard={() => handleOpenModalDeleteBoard(board.id)}
            handleSelectBoard={() => handleSelectBoard(board.id)}
          />
        ))}
      </div>

      {/* MODAL DELETE BOARD */}
      <DeleteDialog
        title="Board"
        disabled={isDeletePending}
        loading={isDeletePending}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={() => handleDeleteBoard(selectedBoardToDelete)}
      />
    </div>
  );
}
