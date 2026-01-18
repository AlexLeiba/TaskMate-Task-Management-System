import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, X } from "lucide-react";
import { Spacer } from "@/components/ui/spacer";
import { Description } from "./Description/Description";
import { Reporter } from "./Reporter/Reporter";
import { CardDetailsType } from "@/lib/types";
import { AssignTo } from "./AssignTo";
import { Priority } from "./Priority/Priority";
import { Actions } from "./Actions";
import { DateTime } from "./DateTime";
import { InteractiveFeaturesTabs } from "./InteractiveFeaturesTabs/InteractiveFeaturesTabs";

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
  console.log("🚀 ~ TicketCardDetails ~ cardId:", cardId, listId, listTitle);
  // TODO, fetch card details when open it
  const now = new Date("2023-01-01T00:00:00").getTime();
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
    listName: "List name",
    createdAt: now,
    updatedAt: now,
    comments: [
      {
        id: "123",
        comment: "This is a sample comment",
        createdAt: now,
        author: {
          email: "sample@example.com",
          name: "Sample User",
          avatar: `https://picsum.photos/300/300`,
          id: "123",
        },
      },
      {
        id: "12335",
        comment:
          "This is a sample comment This is a sample comment This is a sample comment This is a sample comment This is a sample comment This is a sample comment This is a sample comment This is a sample comment",
        createdAt: now,
        author: {
          email: "sample@example.com",
          name: "Sample User 2",
          avatar: `https://picsum.photos/300/300`,
          id: "1233",
        },
      },
      {
        id: "123333",
        comment:
          "This is a sample comment This is a sample comment This is a sample comment This is a sample comment This is a sample comment",
        createdAt: now,
        author: {
          email: "sample@example.com",
          name: "Sample User 2",
          avatar: `https://picsum.photos/300/300`,
          id: "123333",
        },
      },
    ],
    attachments: [
      {
        files: [
          {
            type: "image/png",
            id: "123",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
          {
            type: "image/png",
            id: "1236",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
          {
            type: "image/png",
            id: "123556",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
        ],
        createdAt: now,

        author: {
          email: "sample@example.com",
          name: "Sample User",
          avatar: `https://picsum.photos/300/300`,
          id: "1232",
        },
      },
      {
        files: [
          {
            type: "image/png",
            id: "1672ds3",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
          {
            type: "application/pdf",
            id: "1672dsds3",
            name: "my-file2.pdf",
            url: "https://picsum.photos/300/300",
          },
          {
            type: "application/pdf",
            id: "1672ddsdss3",
            name: "my-file.pdf",
            url: "https://picsum.photos/300/300",
          },
        ],
        createdAt: now,
        author: {
          email: "sample@example.com",
          name: "Sample User",
          avatar: `https://picsum.photos/300/300`,
          id: "12763",
        },
      },
      {
        files: [
          {
            type: "image/png",
            id: "127ds673",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
          {
            type: "image/png",
            id: "127dsd673",
            name: "image.png",
            url: "https://picsum.photos/300/300",
          },
        ],
        createdAt: now,
        author: {
          email: "sample@example.com",
          name: "Sample User 2",
          avatar: `https://picsum.photos/300/300`,
          id: "1267333",
        },
      },
    ],
  };
  return (
    <Dialog open={isCardDetailsOpened} onOpenChange={setIsCardDetailsOpened}>
      <DialogContent className="min-w-200 h-200 flex flex-col overflow-hidden">
        <DialogClose>
          <X size={20} />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl">{cardDetails.title}</DialogTitle>
          <div className="flex gap-2">
            <MapPin />
            <span className="opacity-70">From list - </span>{" "}
            <span className="underline">{cardDetails.listName}</span>
          </div>
        </DialogHeader>
        <Spacer size={2} />
        {/* CARD DETAILS CONTENT GRID */}
        <div className=" grid grid-cols-[2fr_1fr] gap-8">
          {/* 1COL */}
          <div className="flex flex-col gap-8">
            <Description data={cardDetails} />
            <InteractiveFeaturesTabs data={cardDetails} />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-8">
            <Reporter data={cardDetails.reporter} />
            <AssignTo data={cardDetails.assignedTo} />
            <Priority data={cardDetails.priority} />
            <Actions
              cardId={cardDetails.id}
              listId={cardDetails.listId}
              cardTitle={cardDetails.title}
            />

            <DateTime
              createdAt={cardDetails.createdAt}
              updatedAt={cardDetails.updatedAt}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
