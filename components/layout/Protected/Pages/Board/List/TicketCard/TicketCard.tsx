"use client";
import { TicketCardHeader } from "./TicketCardHeader";
import { TicketCardBody } from "./TicketCardBody/TicketCardBody";
import { useState } from "react";
import { TicketCardDetails } from "./TicketCardDetails/TicketCardDetails";
import { KEYBOARD } from "@/lib/consts";
import { Card } from "@/lib/generated/prisma/client";

type Prop = {
  data: Card;
};
export function TicketCard({ data }: Prop) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] = useState(false);
  // OPEN TICKET CARD DETAILS
  function handleOpenTicketDetails() {
    setIsCardDetailsOpened(true);
  }

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === KEYBOARD.ENTER) {
            const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
            const ticketCard = target.closest(".ticket-card");

            if (ticketCard) handleOpenTicketDetails();
          }
        }}
        title={`open - ${data.title}`}
        aria-label={`open ${data.title}`}
        onClick={(e) => {
          const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
          const ticketCard = target.closest(".ticket-card");

          if (ticketCard) {
            handleOpenTicketDetails();
          }
        }}
        className="ticket-card w-full cursor-pointer dark:hover:ring-gray-400 dark:hover:ring p-2 dark:bg-gray-600 rounded-sm flex flex-col justify-start items-start gap-2 "
      >
        {/* TICKET CARD HEADER */}
        <TicketCardHeader title={data.title} cardId={data.id.toString()} />

        {/* TICKET CARD BODY */}
        <TicketCardBody
          priority={data.priority}
          assignedTo={data.assignedToId}
        />
      </div>

      {/* TICKET CARD DETAILS MODAL*/}
      <TicketCardDetails
        cardTitle={data.title}
        cardId={data.id.toString()}
        listId={data.listId}
        listTitle={data.listName}
        isCardDetailsOpened={isCardDetailsOpened}
        setIsCardDetailsOpened={setIsCardDetailsOpened}
      />
    </>
  );
}
