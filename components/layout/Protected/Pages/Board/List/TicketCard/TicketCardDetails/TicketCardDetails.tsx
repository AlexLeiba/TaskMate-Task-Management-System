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
import { CardDetailsType } from "@/app/actions/card-details";
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
  return (
    <Dialog open={isModalOpened} onOpenChange={handleCloseModal}>
      <DialogContent className="md:min-w-[80%] md:max-h-200 md:min-h-100 lg:min-h-125  lg:max-h-210 lg:min-w-[80%] sm:min-w-full sm:min-h-full  flex flex-col overflow-y-auto h-full">
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
            <Description
              description={cardDetails?.description || ""}
              cardId={cardDetails?.card.id}
            />
            <InteractiveFeaturesTabs
              comments={cardDetails?.comments}
              cardId={cardDetails?.id || ""}
              listId={cardDetails?.card.listId || ""}
            />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between w-full ">
              <Reporter data={cardDetails?.card.reporter} />
            </div>

            <AssignTo
              assignedTo={cardDetails?.card.assignedToEmail || ""}
              listId={cardDetails?.card.listId}
              cardId={cardDetails?.card.id || ""}
            />
            <div className="flex items-center gap-4 w-full justify-between ">
              <ChecklistList
                cardId={cardDetails?.card.id}
                listId={cardDetails?.card.listId}
                data={cardDetails?.checklist || []}
              />
              <Priority
                priority={cardDetails?.card.priority}
                listId={cardDetails?.card.listId}
                cardId={cardDetails?.card.id}
              />
            </div>
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
