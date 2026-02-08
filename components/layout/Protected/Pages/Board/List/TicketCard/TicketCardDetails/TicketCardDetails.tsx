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
import { AssignTo } from "./AssignTo/AssignTo";
import { Priority } from "./Priority/Priority";
import { InteractiveFeaturesTabs } from "./InteractiveFeaturesTabs/InteractiveFeaturesTabs";
import { getCardDetails } from "@/app/actions/card-details";
import { ChecklistList } from "./ChecklistList";
import { DueDate } from "./DueDate/DueDate";
import { Actions } from "./Actions/Actions";
import { DateTime } from "./DateTime";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

type Props = {
  handleCloseModal: () => void;
  isModalOpened: boolean;
  cardDetailsId: string;
  cardTitle: string | undefined;
  listTitle: string | undefined;
};
export function TicketCardDetails({
  cardDetailsId,
  handleCloseModal,
  isModalOpened,
  cardTitle,
  listTitle,
}: Props) {
  async function getDetailsData() {
    try {
      const response = await getCardDetails(cardDetailsId);

      if (response.data) {
        return response.data;
      }

      if (response?.error?.message) {
        throw new Error(response.error.message);
      }
    } catch (error: any) {
      toast.error(
        error.message || "Error getting card details, please try again",
      );
    }
  }

  const { data: cardDetailsData } = useQuery({
    queryKey: ["card-details", cardDetailsId],
    queryFn: getDetailsData,
    enabled: isModalOpened,
  });

  return (
    <Dialog open={isModalOpened} onOpenChange={handleCloseModal}>
      <DialogContent
        className={cn(
          "flex flex-col overflow-y-auto h-full",
          "md:min-w-[80%] md:max-w-200 md:max-h-200 md:min-h-100",
          "sm:min-w-full sm:min-h-full",
          "lg:max-w-350  lg:max-h-210  ",
        )}
      >
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
          <div className="flex flex-col gap-6  ">
            <Description
              description={cardDetailsData?.description || ""}
              cardDetailsId={cardDetailsData?.id}
            />

            {/* TABS */}
            <InteractiveFeaturesTabs
              comments={cardDetailsData?.comments}
              cardDetailsId={cardDetailsData?.id || ""}
            />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-6 ">
            <div className="flex items-end justify-between w-full ">
              <Reporter data={cardDetailsData?.card.reporter} />
            </div>

            <AssignTo
              assignedTo={cardDetailsData?.card.assignedToEmail || ""}
              listId={cardDetailsData?.card.listId}
              cardDetailsId={cardDetailsData?.card.id || ""}
            />
            <div className="flex items-center gap-4 w-full justify-between ">
              <ChecklistList
                cardDetailsId={cardDetailsData?.card.id}
                listId={cardDetailsData?.card.listId}
                data={cardDetailsData?.checklist || []}
              />
              <Priority
                priority={cardDetailsData?.card.priority}
                listId={cardDetailsData?.card.listId}
                cardDetailsId={cardDetailsData?.card.id}
              />
            </div>
            <DueDate
              data={cardDetailsData?.dueDate}
              cardDetailsId={cardDetailsData?.id}
            />
            <div className="flex flex-col">
              <Actions
                cardDetailsId={cardDetailsData?.card.id || ""}
                listId={cardDetailsData?.card.listId || ""}
                cardId={cardDetailsData?.card.id || ""}
              />
              <div className="flex justify-end my-4">
                <DateTime
                  createdAt={cardDetailsData?.card.createdAt}
                  updatedAt={cardDetailsData?.card.updatedAt}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
