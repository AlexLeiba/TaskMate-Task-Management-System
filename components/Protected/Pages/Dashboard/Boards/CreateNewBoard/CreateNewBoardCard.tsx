"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/iconButton";
import { useStore } from "@/store/useStore";
import { useShallow } from "zustand/shallow";
import { CreateNewBoardDialog } from "./CreateNewBoardDialog";
import { DialogBoardDetails } from "./DialogBoardDetails";
import { useSession } from "@/hooks/useSession";
import { useState } from "react";
import { STRIPE_PRODUCT_NAME } from "@/lib/consts/consts";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const RemainedNrOfCardsToCreate = dynamic(
  () =>
    import("./RemainedNrOfCardsToCreate").then(
      (m) => m.RemainedNrOfCardsToCreate,
    ),
  {
    ssr: false,
  },
);

const UpdateSubscriptionDialog = dynamic(() =>
  import("@/components/Protected/Shared-protected/UpdateSubscriptionDialog/UpdateSubscriptionDialog").then(
    (m) => m.UpdateSubscriptionDialog,
  ),
);

const SubscriptionPlans = dynamic(() =>
  import("@/components/Protected/Shared-protected/UpdateSubscriptionDialog/SubscriptionPlans").then(
    (m) => m.SubscriptionPlans,
  ),
);

type Props = {
  disabled?: boolean;
  nrOfBoards?: number;
};
export function CreateNewBoardCard({
  disabled = false,
  nrOfBoards = 0,
}: Props) {
  const session = useSession();
  const [updateSubscrptionDialogOpen, setUpdateSubscriptionDialogOpen] =
    useState(false);

  // DIALOG STATE HANDLED BY GLOBAL STATE BECAUSE THE DIALOG IS USED BY MULTIPLE COMPONENTS
  const { newBoardDialogOpen, setNewBoardDialogOpen } = useStore(
    useShallow((state) => ({
      newBoardDialogOpen: state.newBoardDialogOpen,
      setNewBoardDialogOpen: state.setNewBoardDialogOpen,
    })),
  );

  function handleCreateNewBoardDialog() {
    //CHECK IF USER HAS PERMISSION BASED ON SUBSCRIPTION
    if (
      (!session?.data?.isActiveSubscription && nrOfBoards >= 5) ||
      (session?.data?.isActiveSubscription &&
        session?.data?.planName === STRIPE_PRODUCT_NAME.Silver &&
        nrOfBoards >= 10)
    ) {
      toast.error(
        "You have reached the limit of boards. Please upgrade your plan to add more boards",
      );
      setUpdateSubscriptionDialogOpen(true);
      return;
    }

    setNewBoardDialogOpen(true, "dashboard");
  }
  return (
    <>
      {/* CREATE CARD */}
      <IconButton
        data-test="create-new-board-card"
        disabled={disabled}
        classNameChildren="group flex flex-col w-full justify-center items-center "
        onClick={handleCreateNewBoardDialog}
        title="Create new board"
        aria-label="Create new board"
        className="relative group   rounded-md p-2  overflow-hidden text-black  hover:bg-gray-500  bg-gray-200 hover:text-white md:max-w-72.5 w-full"
      >
        <p className="text-xl ">Create new board</p>

        <Plus className="size-10  p-1 z-20  text-gray-700 group-hover:text-white" />

        <RemainedNrOfCardsToCreate
          nrOfBoards={nrOfBoards}
          sessionData={session?.data}
        />

        <Tooltip>
          <TooltipTrigger
            asChild
            className="absolute right-2 top-50% text-gray-400"
          >
            <Info />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-base">
              <strong>Free</strong> workspaces can have up to 5 boards
            </p>
            <p className="text-base">
              <strong>Silver</strong> workspaces can have up to 10 boards
            </p>
            <p className="text-base">
              <strong>Gold and Diamand</strong> have unlimited boards
            </p>
          </TooltipContent>
        </Tooltip>
      </IconButton>

      {/* DIALOG CREATE NEW BOARD */}
      {newBoardDialogOpen.dashboard && (
        <CreateNewBoardDialog
          type="dashboard"
          newBoardDialogOpen={newBoardDialogOpen}
          setNewBoardDialogOpen={setNewBoardDialogOpen}
        >
          <DialogBoardDetails type="dashboard" />
        </CreateNewBoardDialog>
      )}
      {updateSubscrptionDialogOpen && (
        <UpdateSubscriptionDialog
          subscriptionsOpen={updateSubscrptionDialogOpen}
          setSubscriptionsOpen={setUpdateSubscriptionDialogOpen}
        >
          <SubscriptionPlans />
        </UpdateSubscriptionDialog>
      )}
      {/* CREATE CARD FORM */}
    </>
  );
}
