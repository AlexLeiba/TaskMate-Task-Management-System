"use client";
import { TicketCardHeader } from "./TicketCardHeader";
import { TicketCardBody } from "./TicketCardBody/TicketCardBody";
import { useCallback, useState } from "react";
import { KEYBOARD } from "@/lib/consts";
import { Card } from "@/lib/generated/prisma/client";
import { CardDetailsType, getCardDetails } from "@/app/actions/card-details";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const TicketCardDetails = dynamic(() =>
  import("./TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);

type Prop = {
  data: Card;
  boardId: string;
};
export function TicketCard({ data, boardId }: Prop) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetailsType | null>(null);
  const handleCloseDetails = useCallback(() => {
    setIsCardDetailsOpened(false);
  }, []);

  // OPEN TICKET CARD DETAILS
  async function handleOpenDetails() {
    setIsCardDetailsOpened(true);
    await getDetailsData();
  }

  async function getDetailsData() {
    if (!data.id) return;
    const response = await getCardDetails(data.id.toString());

    if (response?.error?.message) {
      return toast.error(response.error.message);
    }

    if (response?.data) {
      setCardDetails(response.data);
    }
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
        className="ticket-card w-full cursor-pointer dark:hover:ring-gray-400 dark:hover:ring p-2 dark:bg-gray-600 rounded-sm flex flex-col justify-start items-start gap-2 "
      >
        {/* TICKET CARD HEADER */}
        <TicketCardHeader
          title={data.title}
          cardId={data.id.toString()}
          listId={data.listId}
          boardId={boardId}
          cardDetailsId={cardDetails?.id.toString() || ""}
        />

        {/* TICKET CARD BODY */}
        <TicketCardBody data={data} boardId={boardId} />
      </div>

      {/* TICKET CARD DETAILS MODAL*/}
      <TicketCardDetails
        cardTitle={data.title}
        listTitle={data.listName}
        cardDetails={cardDetails}
        isModalOpened={isCardDetailsOpened}
        handleCloseModal={handleCloseDetails}
      />
    </>
  );
}
