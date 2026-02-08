"use client";
import { TicketCardHeader } from "./TicketCardHeader";
import { TicketCardBody } from "./TicketCardBody/TicketCardBody";
import { useCallback, useState } from "react";
import { KEYBOARD } from "@/lib/consts";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { CardAndDueDateAndChecklistType } from "@/lib/types";

const TicketCardDetails = dynamic(() =>
  import("./TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);

type Prop = {
  data: CardAndDueDateAndChecklistType;
  boardId: string;
};
export function TicketCard({ data, boardId }: Prop) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] = useState(false);

  const handleCloseDetails = useCallback(() => {
    setIsCardDetailsOpened(false);
  }, []);

  // OPEN TICKET CARD DETAILS
  async function handleOpenDetails() {
    setIsCardDetailsOpened(true);
  }

  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.key === KEYBOARD.ENTER) {
            const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
            const ticketCard = target.closest(".ticket-card");

            if (ticketCard) handleOpenDetails();
          }
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
          const ticketCard = target.closest(".ticket-card");

          if (ticketCard) {
            handleOpenDetails();
          }
        }}
        title={`open - ${data.title}`}
        aria-label={`open ${data.title}`}
        tabIndex={0}
        className={cn(
          "ticket-card",
          "dark:hover:ring-gray-400 dark:bg-gray-600  dark:hover:ring",
          "p-2 w-full cursor-pointer  rounded-sm",
          "flex flex-col justify-start items-start gap-2 active:bg-gray-700 group",
        )}
      >
        {/* TICKET CARD HEADER */}
        <TicketCardHeader
          title={data.title}
          cardId={data.id.toString()}
          listId={data.listId}
          boardId={boardId}
          cardDetailsId={data.id.toString() || ""}
        />

        {/* TICKET CARD BODY */}
        <TicketCardBody data={data} boardId={boardId} />
      </div>

      {/* TICKET CARD DETAILS MODAL*/}

      <TicketCardDetails
        cardTitle={data.title}
        listTitle={data.listName}
        cardDetailsId={data?.id || ""}
        isModalOpened={isCardDetailsOpened}
        handleCloseModal={handleCloseDetails}
      />
    </>
  );
}
