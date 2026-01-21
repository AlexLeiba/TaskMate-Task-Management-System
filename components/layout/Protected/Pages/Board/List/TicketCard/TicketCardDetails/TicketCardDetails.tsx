import { Dispatch, SetStateAction } from "react";
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
import { CardDetailsType } from "@/lib/types";
import { AssignTo } from "./AssignTo/AssignTo";
import { Priority } from "./Priority/Priority";
import { Actions } from "./Actions";
import { DateTime } from "./DateTime";
import { InteractiveFeaturesTabs } from "./InteractiveFeaturesTabs/InteractiveFeaturesTabs";
import { DueDate } from "./DueDate/DueDate";
import { ChecklistList } from "./ChecklistList";

type Props = {
  setIsCardDetailsOpened: Dispatch<SetStateAction<boolean>>;
  isCardDetailsOpened: boolean;
  cardId: string;
  listId: string | undefined;
  listTitle: string;
  cardTitle: string;
};
export function TicketCardDetails({
  setIsCardDetailsOpened,
  isCardDetailsOpened,
  cardId,
  listId,
  listTitle,
  cardTitle,
}: Props) {
  // TODO, fetch card details when open it
  const now = new Date("2023-01-01T00:00:00").getTime();
  const cardDetails: CardDetailsType = {
    description: `<p>This&nbsp;is&nbsp;a&nbsp;sample&nbsp;description&nbsp;for&nbsp;the&nbsp;ticket&nbsp;card.&nbsp;It&nbsp;provides&nbsp;detailed&nbsp;information&nbsp;about&nbsp;the&nbsp;task,&nbsp;its&nbsp;requirements,&nbsp;and&nbsp;any&nbsp;other&nbsp;relevant&nbsp;details&nbsp;that&nbsp;team&nbsp;members&nbsp;need&nbsp;to&nbsp;know.</p>`,
    id: "123",
    title: "Sample Ticket Card",
    priority: "high",
    reporter: {
      email: "sample@example.com",
      name: "Sample User",
      avatar: `https://picsum.photos/300/300`,
    },
    assignedTo: {
      //selected user from list of members
      email: "sample@example1.com",
      name: "Sample User",
      avatar: `https://picsum.photos/300/300`,
    },

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
        createdAt: now,

        author: {
          email: "sample@example.com",
          name: "Sample User",
          avatar: `https://picsum.photos/300/300`,
          id: "1232",
        },

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
    checklist: [
      {
        id: "1",
        title: "To do task1",
        isCompleted: true,
      },
      {
        id: "12",
        title: "To do task1",
        isCompleted: true,
      },
      {
        id: "12",
        title: "To do task1",
        isCompleted: false,
      },
    ],
    dueDate: {
      date: now,
      time: now,
    },
  };

  return (
    <Dialog open={isCardDetailsOpened} onOpenChange={setIsCardDetailsOpened}>
      <DialogContent className="md:min-w-[80%] md:max-h-200 md:min-h-100 lg:min-h-125  lg:max-h-200 lg:min-w-[80%] sm:min-w-full sm:min-h-full  flex flex-col overflow-y-auto h-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">{cardTitle}</DialogTitle>
          <div className="flex gap-2">
            <MapPin />
            <span className="opacity-70">From list - </span>{" "}
            <span className="underline">{listTitle}</span>
          </div>
        </DialogHeader>
        <Spacer size={2} />
        {/* CARD DETAILS CONTENT GRID */}
        <div className=" grid lg:grid-cols-[2fr_1fr] gap-8 ">
          {/* 1COL */}
          <div className="flex flex-col gap-6 ">
            <Description data={cardDetails} />
            <InteractiveFeaturesTabs data={cardDetails} />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between w-full ">
              <Reporter data={cardDetails.reporter} />
            </div>
            <div className="flex items-center gap-2 w-full ">
              <AssignTo data={cardDetails.assignedTo} />
              <Priority data={cardDetails.priority} />
            </div>
            <ChecklistList
              cardId={cardDetails.id}
              listId={cardDetails.listId}
              data={cardDetails.checklist}
            />
            <DueDate data={cardDetails.dueDate} />
            <div className="flex flex-col justify-between h-full ">
              <Actions
                cardId={cardDetails.id}
                listId={cardDetails.listId}
                cardTitle={cardDetails.title}
              />
              <div className="flex justify-end my-4">
                <DateTime
                  createdAt={cardDetails.createdAt}
                  updatedAt={cardDetails.updatedAt}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
