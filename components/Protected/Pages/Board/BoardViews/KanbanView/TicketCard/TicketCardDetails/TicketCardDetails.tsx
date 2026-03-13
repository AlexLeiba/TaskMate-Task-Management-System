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
import { useUserData } from "@/hooks/useUserData";
import { USER_ROLES } from "@/lib/consts";
import { useRole } from "@/hooks/useRole";
import { ChangeStatus } from "./ChangeStatus/ChangeStatus";
import { useBoardId } from "@/hooks/useBoardId";

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
  const user = useUserData();
  const role = useRole();
  const boardId = useBoardId();
  async function getDetailsData() {
    if (!cardDetailsId) return;

    try {
      const response = await getCardDetails(cardDetailsId, boardId);

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
      throw error.message || "Error getting card details, please try again";
    }
  }

  const { data: cardDetailsData } = useQuery({
    queryKey: ["card-details", cardDetailsId],
    queryFn: getDetailsData,
    enabled: isModalOpened,
    staleTime: 0,
  });

  return (
    <Dialog open={isModalOpened} onOpenChange={handleCloseModal}>
      <DialogContent
        aria-describedby="The dialog is used to view card details"
        className={cn(
          "flex flex-col overflow-y-auto h-full",
          "md:min-w-[75%] md:max-w-200 md:max-h-200 md:min-h-100",
          "lg:min-w-[70%]  lg:max-w-300 lg:max-h-210 lg:min-h-200",
          "min-w-full min-h-full",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-left">{cardTitle}</DialogTitle>
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
              description={cardDetailsData?.card?.description || ""}
              cardDetailsId={cardDetailsData?.card?.id}
              isAssignedUserEmail={
                cardDetailsData?.card?.card.assignedToEmail === user?.email
              }
            />

            {/* TABS */}
            <InteractiveFeaturesTabs
              comments={cardDetailsData?.card?.comments}
              cardDetailsId={cardDetailsData?.card?.id || ""}
              assignedUserEmail={cardDetailsData?.card.card?.assignedToEmail}
            />
          </div>

          {/* 2COL */}
          <div className="flex flex-col gap-6 ">
            <div className="flex items-end justify-between w-full ">
              <Reporter data={cardDetailsData?.card?.card?.reporter} />
            </div>

            <AssignTo
              assignedTo={cardDetailsData?.card.card?.assignedToEmail || ""}
              listId={cardDetailsData?.card.card?.listId}
              cardDetailsId={cardDetailsData?.card.card.id || ""}
            />
            <div className="flex items-center gap-4 w-full justify-between ">
              <ChecklistList
                cardDetailsId={cardDetailsData?.card.card.id}
                listId={cardDetailsData?.card.card?.listId}
                data={cardDetailsData?.card?.checklist || []}
              />
              <Priority
                priority={cardDetailsData?.card.card?.priority}
                listId={cardDetailsData?.card.card?.listId}
                cardDetailsId={cardDetailsData?.card.card.id}
              />
            </div>
            <ChangeStatus
              listId={cardDetailsData?.card?.card?.listId}
              cardId={cardDetailsData?.card?.card.id}
              currentStatusType={cardDetailsData?.card?.card?.list}
              listsData={cardDetailsData?.list || []}
            />
            <DueDate
              data={cardDetailsData?.card.dueDate}
              cardDetailsId={cardDetailsData?.card?.id}
            />
            <div className="flex flex-col">
              {role === USER_ROLES.admin && (
                <Actions
                  cardDetailsId={cardDetailsData?.card.id || ""}
                  listId={cardDetailsData?.card?.card?.listId || ""}
                  cardId={cardDetailsData?.card?.card?.id || ""}
                />
              )}
              <div className="flex justify-end my-2">
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
