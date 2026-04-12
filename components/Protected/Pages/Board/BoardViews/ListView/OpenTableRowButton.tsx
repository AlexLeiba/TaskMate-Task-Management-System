import { IconButton } from "@/components/ui/iconButton";
import { CardDetailsTableProps } from "@/lib/types";
import dynamic from "next/dynamic";
import React, { useState } from "react";

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
};
export function OpenTableRowButton({
  children,
  cardDetailsId,
  cardTitle,
  listTitle,
  isVisible,
  title,
}: Props) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] =
    useState<CardDetailsTableProps>(DEFAULT_CARD_DETAILS);
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
    });
  }
  return (
    <>
      <IconButton
        onClick={() =>
          handleClickRow(cardDetailsId, cardTitle, listTitle, isVisible)
        }
        className="flex items-center gap-2 w-full p-1 text-left"
        title={title}
        aria-label={title}
      >
        {children}
      </IconButton>

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
