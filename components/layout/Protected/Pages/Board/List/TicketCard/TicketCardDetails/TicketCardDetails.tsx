import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, X } from "lucide-react";
import { Spacer } from "@/components/ui/spacer";
import { Description } from "./Description/Description";
import { Reporter } from "./Reporter/Reporter";
import { AssignTo } from "./AssignTo/AssignTo";
import { Priority } from "./Priority/Priority";
import { InteractiveFeaturesTabs } from "./InteractiveFeaturesTabs/InteractiveFeaturesTabs";
import { CardDetailsType, getCardDetails } from "@/app/actions/card-details";
import toast from "react-hot-toast";
import { Card } from "@/lib/generated/prisma/client";
import { ChecklistList } from "./ChecklistList";
import { DueDate } from "./DueDate/DueDate";
import { Actions } from "./Actions";
import { DateTime } from "./DateTime";

type Props = {
  handleCloseModal: () => void;
  isModalOpened: boolean;
  cardDetails: CardDetailsType | null;
};
export function TicketCardDetails({
  cardDetails,
  handleCloseModal,
  isModalOpened,
}: Props) {
  console.log("🚀 ~ TicketCardDetails ~ cardDetails:", cardDetails);
  // TODO, fetch card details when open it
  const now = new Date("2023-01-01T00:00:00").getTime();

  return (
    <Dialog open={isModalOpened} onOpenChange={handleCloseModal}>
      <DialogContent className="md:min-w-[80%] md:max-h-200 md:min-h-100 lg:min-h-125  lg:max-h-200 lg:min-w-[80%] sm:min-w-full sm:min-h-full  flex flex-col overflow-y-auto h-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {cardDetails?.card.title}
          </DialogTitle>
          <div className="flex gap-2">
            <MapPin />
            <span className="opacity-70">From list - </span>{" "}
            <span className="underline">{cardDetails?.card.listName}</span>
          </div>
        </DialogHeader>
        <Spacer size={2} />
        {/* CARD DETAILS CONTENT GRID */}
        <div className=" grid lg:grid-cols-[2fr_1fr] gap-8 ">
          {/* 1COL */}
          <div className="flex flex-col gap-6 ">
            <Description description={cardDetails?.description || ""} />
            <InteractiveFeaturesTabs
              comments={cardDetails?.comments}
              cardId={cardDetails?.card.id || ""}
              listId={cardDetails?.card.listId || ""}
            />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between w-full ">
              <Reporter data={cardDetails?.card.reporter} />
            </div>
            <div className="flex items-center gap-2 w-full ">
              <AssignTo
                assignedTo={cardDetails?.card.assignedToEmail || ""}
                listId={cardDetails?.card.listId}
                cardId={cardDetails?.card.id || ""}
              />
              <Priority
                priority={cardDetails?.card.priority}
                listId={cardDetails?.card.listId}
                cardId={cardDetails?.card.id}
              />
            </div>
            <ChecklistList
              cardId={cardDetails?.card.id}
              listId={cardDetails?.card.listId}
              data={cardDetails?.checklist || []}
            />
            <DueDate
              data={cardDetails?.dueDate}
              cardId={cardDetails?.card.id}
              listId={cardDetails?.card.listId}
            />
            <div className="flex flex-col justify-between h-full ">
              <Actions
                cardId={cardDetails?.card.id}
                listId={cardDetails?.card.listId}
                cardTitle={cardDetails?.card.title}
              />
              <div className="flex justify-end my-4">
                <DateTime
                  createdAt={cardDetails?.card.createdAt}
                  updatedAt={cardDetails?.card.updatedAt}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
