import { useState } from "react";
import { Copy, Delete, Edit, Info, X } from "lucide-react";
import { TriggerInput } from "../../../../../../Shared-protected/TriggerInput";
import { Separator } from "@/components/ui/separator";
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  copyCardAction,
  deleteCardAction,
  editCardTitleAction,
} from "@/app/actions/card";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteDialog } from "@/components/Protected/Shared-protected/DeleteDialog/DeleteDialog";
import { apiDeleteFile } from "@/lib/api/apiDeleteFile";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  boardId: string;
  cardId: string;
  listId: string;
  defaultTitle: string;
  cardDetailsId: string;
};
export function OptionsContent({
  boardId,
  cardId,
  listId,
  defaultTitle,
  cardDetailsId,
}: Props) {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  // DELETE CARD
  const {
    mutate: deleteCardMutation,
    isPending: isPendingDeleteCardDeleteCard,
  } = useMutation({
    onMutate: async () => {
      // DELETE FILES FROM CLOUD
      await apiDeleteFile(
        { type: "card", cardDetailsId, fileType: "raw" },
        boardId,
      ); // execution of the mutation will wait until this request is resolved (removing all attachments from cloud)
    },
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.cards.deleteCard],
    mutationFn: deleteCardAction,
    onSuccess: () => {
      setDeleteDialogOpen(false);

      toast.success("Card deleted", {
        id: QUERY_KEYS.pages.board.kanbanView.cards.deleteCard,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
    onError: ({ message }) => {
      setDeleteDialogOpen(false);

      toast.error(message || "Error deleting card, please try again", {
        id: QUERY_KEYS.pages.board.kanbanView.cards.deleteCard,
      });
    },
  });

  async function handleDeleteCard(cardId: string) {
    if (!cardId || !listId || !boardId) {
      toast.error("Something went wrong, please try again");
    }

    toast.loading("Deleting card...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.deleteCard,
    });

    // DELETE FILES FROM DB
    deleteCardMutation({ cardId, listId, boardId });
  }

  // EDIT TITLE
  const { mutate: editTitleCardMutation, isPending: isPendingEditTitleCard } =
    useMutation({
      mutationKey: [
        QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
        cardId,
      ],
      mutationFn: editCardTitleAction,
      onSuccess: () => {
        toast.success("Card title was edited", {
          id: QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError: ({ message }) => {
        toast.error(message || "Error editing card title, please try again", {
          id: QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
        });
      },
    });

  // COPY CARD
  const { mutate: copyCardMutation, isPending: isPendingCopyCard } =
    useMutation({
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.cards.copyCard],
      mutationFn: copyCardAction,
      onSuccess: () => {
        toast.success("Card was copied", {
          id: QUERY_KEYS.pages.board.kanbanView.cards.copyCard,
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError: ({ message }) => {
        toast.error(message || "Error copying card, please try again", {
          id: QUERY_KEYS.pages.board.kanbanView.cards.copyCard,
        });
      },
    });

  //HANDLE CHANGE TITLE
  function handleChangeCardTitle(title: { [inputName: string]: string }) {
    editTitleCardMutation({ title: title.title, cardId, listId, boardId });
    toast.loading("Editing card title...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
    });
    setIsOpenedTitleInput(false);
  }

  function handleOpenModalDeleteCard() {
    setDeleteDialogOpen(true);
  }

  function handleCopyCard() {
    if (!boardId || !listId || !cardId) {
      return toast.error("Something went wrong, please try again");
    }

    toast.loading("Copying card...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.copyCard,
    });
    copyCardMutation({ cardId, listId, boardId });
  }
  return (
    <>
      <div className="flex flex-col gap-2 items-start pl-2">
        {/* EDIT CARD TITLE*/}
        <TriggerInput
          disabled={isPendingEditTitleCard || isPendingCopyCard}
          type="textarea"
          handleSubmitValue={(v) => handleChangeCardTitle(v)}
          inputName="title"
          placeholder="Edit card title here..."
          label="Edit card title"
          setIsOpenedTitleInput={setIsOpenedTitleInput}
          isOpenedTitleInput={isOpenedTitleInput}
          classNameContainer="p-0 mt-4 mb-2 w-full"
          buttonDirection="column"
          defaultValue={defaultTitle}
        >
          <IconButton
            aria-label="Edit"
            title="Edit"
            classNameChildren="flex  gap-2 "
          >
            <Edit />
            <p>Edit card title</p>
          </IconButton>
        </TriggerInput>

        {/* COPY CARD */}
        <IconButton
          disabled={isPendingEditTitleCard || isPendingCopyCard}
          onClick={(e) => {
            e.stopPropagation();
            handleCopyCard();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
              handleCopyCard();
            }
          }}
          aria-label="Copy"
          title="Copy"
          classNameChildren="flex  justify-between items-center"
          className="w-full py-2"
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

        <Separator className="my-4 bg-gray-700" />

        {/* DELETE CARD */}
        <IconButton
          disabled={isPendingEditTitleCard || isPendingCopyCard}
          aria-label="Delete card"
          title="Delete card"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModalDeleteCard();
          }}
          classNameChildren="flex  gap-2 items-center "
          className="w-full"
          data-test="delete-card-button-option"
        >
          <Delete /> Delete
        </IconButton>
      </div>
      {/* DELETE CARD DIALOG */}
      {deleteDialogOpen && (
        <DeleteDialog
          title="Card"
          disabled={!cardId || isPendingDeleteCardDeleteCard}
          loading={isPendingDeleteCardDeleteCard}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleDelete={() => handleDeleteCard(cardId)}
        />
      )}
    </>
  );
}
