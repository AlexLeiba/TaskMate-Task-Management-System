import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Check, Copy, Delete, Info, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { copyCardAction, deleteCardAction } from "@/app/actions/card";

import { useBoardId } from "@/hooks/useBoardId";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { apiDeleteFile } from "@/lib/api/apiDeleteFile";

const DeleteDialog = dynamic(() =>
  import("@/components/Protected/Shared-protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  cardDetailsId: string;
  listId: string;
  cardId: string;
  handleCloseModal: () => void;
};

export function Actions({
  cardDetailsId,
  listId,
  cardId,
  handleCloseModal,
}: Props) {
  const boardId = useBoardId();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  // DELETE CARD
  const {
    mutate: deleteCardMutation,
    isPending: isPendingDeleteCardDeleteCard,
  } = useMutation({
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.cardDetails.deleteCard],
    mutationFn: deleteCardAction,
    onMutate: async () =>
      apiDeleteFile({ type: "card", cardDetailsId, fileType: "raw" }, boardId), // execution of the mutation will wait until this request is resolved (removing all attachments from cloud)
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.deleteCard);
      toast.success("Card deleted");
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.deleteCard);
      toast.error(message || "Error deleting card, please try again");
    },
  });
  // COPY CARD
  const { mutate: copyCardMutation, isPending: isPendingCopyCard } =
    useMutation({
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.cardDetails.copyCard],
      mutationFn: copyCardAction,
      onSuccess: () => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.copyCard);
        toast.success("Card copied");
      },
      onError: ({ message }) => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.copyCard);
        toast.error(message || "Error copying card, please try again");
      },
    });

  async function handleCopyCard() {
    if (!boardId || !listId || !cardId) {
      return toast.error("Something went wrong, please try again");
    }

    toast.loading("Copying card...", {
      id: QUERY_KEYS.pages.board.kanbanView.cardDetails.copyCard,
    });
    copyCardMutation({ listId, boardId: boardId || "", cardId });
  }

  async function handleDeleteCard() {
    if (!cardId || !listId || !boardId) {
      toast.error("Something went wrong, please try again");
    }

    toast.loading("Deleting card...", {
      id: QUERY_KEYS.pages.board.kanbanView.cardDetails.deleteCard,
    });
    setIsDeleteModalOpened(false);

    // DELETE FILES FROM DB
    deleteCardMutation({ cardId, listId, boardId });
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">Actions</p>
      </div>

      <Spacer size={4} />
      <div className="flex gap-4 flex-col md:flex-row">
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
              <p className="text-base">New card will include cloned values:</p>
              <strong> Title , Description , Checklist </strong>
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
        <IconButton
          disabled={isPendingDeleteCardDeleteCard || isPendingCopyCard}
          loading={isPendingDeleteCardDeleteCard}
          title="Close card details"
          aria-label="Close card details"
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full bg-green-800 p-2 rounded-md"
          onClick={handleCloseModal}
        >
          <Check size={20} /> Close
        </IconButton>
        {isDeleteModalOpened && (
          <DeleteDialog
            title="Card"
            disabled={isPendingDeleteCardDeleteCard || isPendingCopyCard}
            loading={isPendingDeleteCardDeleteCard}
            deleteDialogOpen={isDeleteModalOpened}
            setDeleteDialogOpen={setIsDeleteModalOpened}
            handleDelete={handleDeleteCard}
          />
        )}
      </div>
    </div>
  );
}
