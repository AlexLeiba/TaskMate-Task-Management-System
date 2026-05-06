import { STRIPE_PRODUCT_NAME } from "@/lib/consts/consts";
import { User } from "@/lib/generated/prisma/client";
import { UserRoleType } from "@/lib/types";
import React from "react";

export function RemainedNrOfCardsToCreate({
  nrOfBoards = 0,
  sessionData,
}: {
  nrOfBoards: number;
  sessionData:
    | {
        activeUser: User | null;
        role: UserRoleType;
        stripeCustomerId?: string;
        isActiveSubscription?: boolean;
        planName?: string;
      }
    | null
    | undefined;
}) {
  function remainedNrOfCardsToCreate() {
    if (!sessionData?.isActiveSubscription) {
      return nrOfBoards >= 5 ? 0 : 5 - nrOfBoards;
    }
    if (
      sessionData?.isActiveSubscription &&
      sessionData?.planName === STRIPE_PRODUCT_NAME.Silver
    ) {
      return nrOfBoards >= 10 ? 0 : 10 - nrOfBoards;
    }

    if (
      (sessionData?.isActiveSubscription &&
        sessionData?.planName === STRIPE_PRODUCT_NAME.Gold) ||
      (sessionData?.isActiveSubscription &&
        sessionData?.planName === STRIPE_PRODUCT_NAME.Diamand)
    )
      return "unlimited cards";
  }
  return (
    <p className="w-full text-right">
      {remainedNrOfCardsToCreate() && remainedNrOfCardsToCreate()} remained
    </p>
  );
}
