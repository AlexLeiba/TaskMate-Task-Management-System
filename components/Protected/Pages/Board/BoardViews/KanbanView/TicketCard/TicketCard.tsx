"use client";
import { TicketCardHeader } from "./TicketCardHeader";
import { TicketCardBody } from "./TicketCardBody/TicketCardBody";
import { useCallback, useState } from "react";
import { KEYBOARD, USER_ROLES } from "@/lib/consts";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { CardAndDueDateAndChecklistType } from "@/lib/types";
import { Draggable } from "@hello-pangea/dnd";
import { useRole } from "@/hooks/useRole";

const TicketCardDetails = dynamic(() =>
  import("./TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);

type Prop = {
  data: CardAndDueDateAndChecklistType;
  boardId: string;
  index: number;
};
export function TicketCard({ data, boardId, index }: Prop) {
  const role = useRole();
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
      <Draggable draggableId={data.id.toString()} index={index}>
        {(provided) => (
          <>
            <li
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  // Event delegation
                  const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
                  const ticketCard = target.closest(".ticket-card");

                  if (ticketCard) handleOpenDetails();
                }
              }}
              onClick={(e) => {
                // Event delegation
                const target = e.target as HTMLElement; // TypeScript now knows it’s an HTMLElement
                const ticketCard = target.closest(".ticket-card");

                if (ticketCard) {
                  handleOpenDetails();
                }
              }}
              role="button"
              title={`open - ${data.title}`}
              aria-label={`open - ${data.title}`}
              tabIndex={0}
              className={cn(
                "ticket-card",
                "hover:ring-gray-400 bg-card-foreground  hover:ring",
                "p-2 w-full cursor-pointer  rounded-sm",
                "flex flex-col justify-start items-start gap-2 active:bg-card group",
              )}
            >
              {/* TICKET CARD HEADER */}
              <div className="flex justify-between w-full relative">
                <h4 className="text-lg font-medium pr-6 line-clamp-2">
                  {data.title}
                </h4>
                {role === USER_ROLES.admin && (
                  <TicketCardHeader
                    title={data.title}
                    cardId={data.id.toString()}
                    listId={data.listId}
                    boardId={boardId}
                    cardDetailsId={data.id.toString() || ""}
                  />
                )}
              </div>

              {/* TICKET CARD BODY */}
              <TicketCardBody data={data} boardId={boardId} />
            </li>
          </>
        )}
      </Draggable>
      {/* TICKET CARD DETAILS MODAL*/}
      {isCardDetailsOpened && (
        <TicketCardDetails
          cardTitle={data.title}
          listTitle={data.listName}
          cardDetailsId={data?.id || ""}
          isModalOpened={isCardDetailsOpened}
          handleCloseModal={handleCloseDetails}
        />
      )}
    </>
  );
}
