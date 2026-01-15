import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MapPin } from "lucide-react";

import { Spacer } from "@/components/ui/spacer";
import { Description } from "./Description/Description";
import { Reporter } from "./Reporter/Reporter";
import { CardDetailsType } from "@/lib/types";
import { AssignTo } from "./AssignTo";
import { Priority } from "./Priority/Priority";
import { Actions } from "./Actions";

type Props = {
  setIsCardDetailsOpened: Dispatch<SetStateAction<boolean>>;
  isCardDetailsOpened: boolean;
  cardId: string;
  listId: string | undefined;
  listTitle: string;
};
export function TicketCardDetails({
  setIsCardDetailsOpened,
  isCardDetailsOpened,
  cardId,
  listId,
  listTitle,
}: Props) {
  // TODO, fetch card details when open it
  const cardDetails: CardDetailsType = {
    description:
      "This is a sample description for the ticket card. It provides detailed information about the task, its requirements, and any other relevant details that team members need to know.",
    id: "123",
    title: "Sample Ticket Card",
    priority: "high",
    reporter: {
      email: "sample@example.com",
      name: "Sample User",
      avatar: `https://picsum.photos/300/300`,
    },
    assignedTo: [
      {
        email: "sample@example1.com",
        name: "Sample User",
        avatar: `https://picsum.photos/300/300`,
      },
      {
        email: "sample@example2.com",
        name: "Sample User 2",
        avatar: `https://picsum.photos/300/300`,
      },
      {
        email: "sample@example3.com",
        name: "Sample User 2",
        avatar: `https://picsum.photos/300/300`,
      },
    ],
    listName: "To Do",
  };
  return (
    <div>
      <Dialog open={isCardDetailsOpened} onOpenChange={setIsCardDetailsOpened}>
        <DialogContent className="min-w-200 min-h-200 flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">{cardDetails.title}</DialogTitle>
            <div className="flex gap-2">
              <MapPin />
              <span className="opacity-70">From list - </span>{" "}
              <span className="underline">{cardDetails.listName}</span>
            </div>
          </DialogHeader>
          <Spacer size={2} />
          {/* CARD DETAILS CONTENT */}
          <div className=" grid grid-cols-[2fr_1fr] gap-8">
            <Description data={cardDetails} />
            <div className="flex flex-col gap-8">
              <Reporter data={cardDetails.reporter} />
              <AssignTo data={cardDetails.assignedTo} />
              <Priority data={cardDetails.priority} />
              <Actions cardId={cardDetails.id} listId={cardDetails.listId} />
            </div>
          </div>
          {/* <DialogFooter className="flex ">
            <DialogClose asChild>
              <Button size={"lg"} type="button" variant="default">
                Cancel
              </Button>
            </DialogClose>
            <Button
              size={"lg"}
              type="button"
              variant="destructive"
              onClick={() => handleDeleteCard(cardId)}
            >
              Delete
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
