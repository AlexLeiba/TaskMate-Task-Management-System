import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Copy, Delete, Info } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { copyCardAction, deleteCardAction } from "@/app/actions/card";
import { DeleteFileBodyType } from "@/lib/types";
import { axiosInstance } from "@/lib/config";
import { API_REQ_URL } from "@/lib/consts";
import { useBoardId } from "@/hooks/useBoardId";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  cardDetailsId: string;
  listId: string;
  cardId: string;
};

export function Actions({ cardDetailsId, listId, cardId }: Props) {
  const boardId = useBoardId();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  async function deleteFile() {
    try {
      if (!cardDetailsId) {
        return toast.error("Card not found");
      }
      const body: DeleteFileBodyType = {
        type: "card",
        cardDetailsId,
        fileType: "raw",
      };

      const response = await axiosInstance.delete(API_REQ_URL.upload, {
        data: body,
      });

      if (response?.data?.statusCode !== 200) {
        return toast.error(response?.data?.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting a file");
    }
  }

  // DELETE CARD
  const {
    mutate: deleteCardMutation,
    isPending: isPendingDeleteCardDeleteCard,
  } = useMutation({
    mutationKey: ["delete-card"],
    mutationFn: deleteCardAction,
    onSuccess: () => {
      toast.dismiss("delete-card");
      toast.success("Card deleted");
    },
    onError: ({ message }) => {
      toast.dismiss("delete-card");
      toast.error(message || "Error deleting card, please try again");
    },
  });
  // COPY CARD
  const { mutate: copyCardMutation, isPending: isPendingCopyCard } =
    useMutation({
      mutationKey: ["copy-card"],
      mutationFn: copyCardAction,
      onSuccess: () => {
        toast.dismiss("copy-card");
        toast.success("Card copied");
      },
      onError: ({ message }) => {
        toast.dismiss("copy-card");
        toast.error(message || "Error copying card, please try again");
      },
    });

  async function handleCopyCard() {
    toast.loading("Copying card...", { id: "copy-card" });
    copyCardMutation({ listId, boardId: boardId || "", cardId });
  }

  async function handleDeleteCard() {
    if (!boardId) return toast.error("Board not found");
    toast.loading("Deleting card...", { id: "delete-card" });
    setIsDeleteModalOpened(false);

    // DELETE FILES FROM CLOUD
    await deleteFile(); //js will await until this fn is resolved before moving to next line

    // DELETE FILES FROM DB
    deleteCardMutation({ cardId, listId, boardId });
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">Actions</p>
      </div>

      <Spacer size={4} />
      <div className="flex gap-4 ">
        <IconButton
          loading={isPendingCopyCard}
          disabled={isPendingDeleteCardDeleteCard || isPendingCopyCard}
          title="Copy card"
          aria-label="Copy card"
          onClick={handleCopyCard}
          classNameChildren="w-full flex justify-between items-center"
          className="w-full  p-2 rounded-md bg-popover"
        >
          <div className="flex gap-2 items-center">
            <Copy size={20} /> Copy
          </div>
          <Tooltip>
            <TooltipTrigger asChild className=" text-gray-400">
              <Info />
            </TooltipTrigger>
            <TooltipContent className="min-w-20 max-w-90 flex flex-col gap-1">
              <p className="text-sm">
                New card will include cloned values:
                <strong> Title , Description , Checklist </strong>
              </p>
            </TooltipContent>
          </Tooltip>
        </IconButton>
        <IconButton
          disabled={isPendingDeleteCardDeleteCard || isPendingCopyCard}
          loading={isPendingDeleteCardDeleteCard}
          title="Delete card"
          aria-label="Delete card"
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full bg-red-800 p-2 rounded-md"
          onClick={() => setIsDeleteModalOpened(true)}
        >
          <Delete size={20} /> Delete
        </IconButton>

        {isDeleteModalOpened && (
          <DeleteDialog
            deleteDialogOpen={isDeleteModalOpened}
            setDeleteDialogOpen={setIsDeleteModalOpened}
            handleDelete={handleDeleteCard}
          />
        )}
      </div>
    </div>
  );
}
