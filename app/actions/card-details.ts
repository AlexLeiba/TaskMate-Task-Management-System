"use server";

import {
  Activity,
  Attachments,
  Card,
  CardDetails,
  Checklist,
  Comment,
  DueDate,
  User,
} from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { currentActiveUser } from "@/lib/server/currentActiveUser";

export type CardDetailsType = CardDetails & {
  //   attachments: Attachments[];
  //   activities: Activity[];
  card: Card & {
    reporter: User;
  };
  comments: (Comment & {
    author: User;
  })[];
  checklist: Checklist[];
  dueDate: DueDate[];
};

export async function getCardDetails(
  cardId: string,
): Promise<{ data: CardDetailsType | null; error: { message: string } }> {
  console.log("🚀 ~ getCardDetails ~ cardId:", cardId);
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.cardDetails.findFirst({
      where: {
        cardId,
      },
      include: {
        card: {
          include: {
            reporter: true,
          },
        },
        // attachments: true,
        comments: {
          include: {
            author: true,
          },
        },
        // activities: true,
        checklist: true,
        dueDate: true,
      },
    });
    console.log("🚀 ~ getCardDetails ~ response:", response);

    if (!response) {
      throw new Error("Card not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export type CardDetailsAttachmentsType = CardDetails & {
  attachments: Attachments[];
};
export async function getCardDetailsAttachments(cardId: string): Promise<{
  data: CardDetailsAttachmentsType | null;
  error: { message: string };
}> {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.cardDetails.findFirst({
      where: {
        cardId,
      },
      include: {
        card: true,
        attachments: true,
      },
    });

    if (!response) {
      throw new Error("Card not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export type CardDetailsActivitiesType = CardDetails & {
  activities: Activity[];
};
export async function getCardDetailsActivities(cardId: string): Promise<{
  data: CardDetailsActivitiesType | null;
  error: { message: string };
}> {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.cardDetails.findFirst({
      where: {
        cardId,
      },
      include: {
        card: true,
        activities: true,
      },
    });

    if (!response) {
      throw new Error("Card not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
