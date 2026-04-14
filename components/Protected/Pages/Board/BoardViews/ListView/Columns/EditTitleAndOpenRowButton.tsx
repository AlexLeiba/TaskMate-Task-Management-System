import { IconButton } from "@/components/ui/iconButton";
import { CardDetailsTableProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import dynamic from "next/dynamic";
import React, { Dispatch, useCallback, useState } from "react";
import { EditTitle } from "./EditTitle";

const TicketCardDetails = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/KanbanView/TicketCard/TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);
type Props = CardDetailsTableProps & {
  children: React.ReactNode;
} & {
  type: "title-and-button" | "only-button";
};

const DEFAULT_CARD_DETAILS = {
  cardTitle: "",
  listTitle: "",
  cardDetailsId: "",
  isVisible: false,
  listId: "",
};
export function EditTitleAndOpenRowButton({
  children,
  cardDetailsId,
  cardTitle,
  listTitle,
  isVisible,
  listId,
  type,
}: Props) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] =
    useState<CardDetailsTableProps>(DEFAULT_CARD_DETAILS);
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

  const onOpenTitleInput: Dispatch<React.SetStateAction<boolean>> = useCallback(
    (value) => setIsOpenedTitleInput(value),
    [],
  );

  return (
    <>
      <div
        className={cn(
          isOpenedTitleInput ? "p-0" : "p-2",
          "flex items-center gap-2 w-full text-left  group relative ",
        )}
      >
        {type === "title-and-button" && (
          <>
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
                  : " absolute top-1/2 right-2  -translate-y-1/2 gap-1 hidden group-hover:flex items-center h-full ",
              )}
            >
              <EditTitle
                onOpenTitleInput={onOpenTitleInput}
                isOpenedTitleInput={isOpenedTitleInput}
                cardDetailsId={cardDetailsId}
                listId={listId}
                cardTitle={cardTitle}
              />

              <IconButton
                className="p-2"
                onClick={() =>
                  handleClickRow(cardDetailsId, cardTitle, listTitle, isVisible)
                }
                title={`Open card details - ${cardTitle}`}
                aria-label={`Open card details - ${cardTitle}`}
              >
                <Eye />
              </IconButton>
            </div>
          </>
        )}
        {type === "only-button" && (
          <IconButton
            className="w-full "
            onClick={() =>
              handleClickRow(cardDetailsId, cardTitle, listTitle, isVisible)
            }
            title={`Open card details - ${cardTitle}`}
            aria-label={`Open card details - ${cardTitle}`}
          >
            {children}
          </IconButton>
        )}
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
