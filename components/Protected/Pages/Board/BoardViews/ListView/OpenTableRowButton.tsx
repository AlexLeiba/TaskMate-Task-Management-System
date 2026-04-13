import { editCardTitleAction } from "@/app/actions/card";
import { TriggerInput } from "@/components/Protected/Shared-protected/TriggerInput";
import { IconButton } from "@/components/ui/iconButton";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { CardDetailsTableProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit, Eye } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TicketCardDetails = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/KanbanView/TicketCard/TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);
type Props = CardDetailsTableProps & {
  children: React.ReactNode;
} & {
  title: string;
};

const DEFAULT_CARD_DETAILS = {
  cardTitle: "",
  listTitle: "",
  cardDetailsId: "",
  isVisible: false,
  listId: "",
};
export function OpenTableRowButton({
  children,
  cardDetailsId,
  cardTitle,
  listTitle,
  isVisible,
  title,
  listId,
}: Props) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] =
    useState<CardDetailsTableProps>(DEFAULT_CARD_DETAILS);
  const role = useRole();
  const boardId = useBoardId();
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  function handleClickRow(
    cardDetailsId: string,
    cardTitle: string,
    listTitle: string,
    isVisible: boolean,
  ) {
    setIsCardDetailsOpened({
      cardTitle,
      listTitle,
      cardDetailsId,
      isVisible,
      listId,
    });
  }

  // EDIT TITLE
  const { mutate: editTitleCardMutation, isPending: isPendingEditTitleCard } =
    useMutation({
      mutationKey: [
        QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
        cardDetailsId,
      ],
      mutationFn: editCardTitleAction,
      onSuccess: () => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard);
        toast.success("Card title was edited");
      },
      onError: ({ message }) => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard);
        toast.error(message || "Error editing card title, please try again");
      },
    });

  //HANDLE CHANGE TITLE
  function handleChangeCardTitle(title: { [inputName: string]: string }) {
    editTitleCardMutation({
      title: title.title,
      cardId: cardDetailsId,
      listId,
      boardId,
    });
    toast.loading("Editing card title...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
    });
    setIsOpenedTitleInput(false);
  }

  return (
    <>
      <div
        className={cn(
          isOpenedTitleInput ? "p-0" : "p-2",
          "flex items-center gap-2 w-full text-left  group relative ",
        )}
      >
        {children}

        <div
          className={cn(
            isOpenedTitleInput
              ? "flex"
              : "hidden group-hover:flex bg-black/50 absolute inset-0 rounded-md",
          )}
        />
        <div
          className={cn(
            isOpenedTitleInput
              ? "flex"
              : " absolute top-1/2 right-2  -translate-y-1/2 gap-4 hidden group-hover:flex items-center h-full ",
          )}
        >
          <TriggerInput
            disabled={isPendingEditTitleCard || role === "member"}
            type="text"
            handleSubmitValue={(v) => handleChangeCardTitle(v)}
            inputName="title"
            placeholder="Edit card title here..."
            label=""
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            isOpenedTitleInput={isOpenedTitleInput}
            classNameContainer={cn(
              isOpenedTitleInput
                ? " absolute top-0 left-0 w-full  z-10 bg-foreground rounded-md"
                : " w-full",
            )}
            buttonDirection="column"
            buttonVisibility={false}
            defaultValue={cardTitle}
            className="h-8"
          >
            <IconButton
              title={`Edit title of - ${title}`}
              aria-label={`Edit title of - ${title}`}
              className="p-2"
            >
              <Edit />
            </IconButton>
          </TriggerInput>

          <IconButton
            className="p-2"
            onClick={() =>
              handleClickRow(cardDetailsId, cardTitle, listTitle, isVisible)
            }
            title={`View card details of - ${title}`}
            aria-label={`View carddetails of - ${title}`}
          >
            <Eye />
          </IconButton>
        </div>
      </div>

      {isCardDetailsOpened && (
        <TicketCardDetails
          cardTitle={isCardDetailsOpened.cardTitle}
          listTitle={isCardDetailsOpened.listTitle}
          cardDetailsId={isCardDetailsOpened.cardDetailsId}
          isModalOpened={isCardDetailsOpened.isVisible}
          handleCloseModal={() => setIsCardDetailsOpened(DEFAULT_CARD_DETAILS)}
        />
      )}
    </>
  );
}
