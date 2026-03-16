"use server";

import { Card, PriorityType, User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import {
  createNewUser,
  checkCurrentActiveUser,
} from "@/lib/server/checkCurrentActiveUser";
import { auth } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";

type EditCardTitleProps = {
  cardId: string;
  listId: string;
  title: string;
  boardId: string;
};
export async function editCardTitleAction({
  cardId,
  listId,
  title,
  boardId,
}: EditCardTitleProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });

    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }

    const response = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data: {
        title,
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Updated card title from "${foundCard.title}" to "${response.title}" from list: "${foundCard.listName}"`,
      type: "updated",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type CopyCardProps = {
  cardId: string;
  listId: string;
  boardId: string;
};
export async function copyCardAction({
  cardId,
  listId,
  boardId,
}: CopyCardProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser?.id) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
      include: {
        details: {
          select: {
            description: true,
            checklist: true,
          },
        },
      },
    });

    const countCards = await prisma.card.count({
      where: {
        listId,
      },
    });

    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }

    const response = await prisma.card.create({
      data: {
        listId,
        listName: foundCard.listName,
        title: foundCard.title + " - copy",
        reporterId: activeUserData?.activeUser.id,
        order: countCards + 1,
        details: {
          create: {
            description: foundCard.details?.description || "",
            checklist: {
              createMany: {
                data:
                  foundCard.details?.checklist?.map((item) => {
                    return {
                      title: item.title,
                      isCompleted: item.isCompleted,
                    };
                  }) || [],
              },
            },
          },
        },
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Created a copy of card: "${foundCard.title}" in new card: "${response.title}" from list: "${foundCard.listName}"`,
      type: "created",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    console.log("🚀 ~ copyCardAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}

type DeleteCardProps = {
  cardId: string;
  listId: string;
  boardId: string;
};

export async function deleteCardAction({
  cardId,
  listId,
  boardId,
}: DeleteCardProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }
    const response = await prisma.card.delete({
      where: {
        id: cardId,
        listId,
      },
    });

    // RESET ORDER OF THE CARDS IN THE LIST, AFTER DELETION
    const startOrderFrom = 1;

    const cards = await prisma.card.findMany({
      where: {
        listId,
      },
    });

    if (!cards) {
      throw new Error("Cards not found");
    }

    await prisma.$transaction(
      cards.map((card, index) => {
        return prisma.card.update({
          where: {
            id: card.id,
          },
          data: {
            order: startOrderFrom + index,
          },
        });
      }),
    );

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Deleted card: "${response.title}" from list: "${response.listName}"`,
      type: "deleted",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type EditPriorityActionProps = {
  cardId: string;
  listId: string;
  priority: PriorityType;
  boardId: string;
};
export async function editPriorityAction({
  cardId,
  listId,
  priority,
  boardId,
}: EditPriorityActionProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }
    const response = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data: {
        priority,
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Updated priority from "${foundCard.priority}" to "${response.priority}" ,of card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type AssignToCardActionProps = {
  cardId: string;
  listId: string;
  boardId: string;
  assignedUserData: Pick<User, "email" | "name" | "avatar">;
};
export async function assignToCardAction({
  cardId,
  listId,
  boardId,
  assignedUserData,
}: AssignToCardActionProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData, error } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser || error?.message) {
      throw new Error(error?.message || "User not authorized");
    }

    // CHECK IF USER EXISTS IN DB, OR JUST IN CLERK
    if (activeUserData?.activeUser?.email !== assignedUserData?.email) {
      await createNewUser({ data: assignedUserData });
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }
    const response = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data: {
        assignedToEmail: assignedUserData.email,
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Assigned "${assignedUserData.name}" to card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
export async function unassigneCardAction({
  cardId,
  listId,
  boardId,
  assignedUserData,
}: AssignToCardActionProps): Promise<{
  data: Card;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }
    const response = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data: {
        assignedToEmail: null,
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Unassigned "${assignedUserData.name}" from card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type EditListStatusCardActionType = {
  cardId: string;
  listId: string;
  newListId: string;
  boardId: string;
};
export async function editListStatusCardAction({
  cardId,
  listId,
  newListId,
  boardId,
}: EditListStatusCardActionType): Promise<{
  data: string;
  error: { message: string };
}> {
  const { data: activeUserData } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
      select: {
        id: true,
        assignedToEmail: true,
      },
    });
    const oldList = await prisma.list.findFirst({
      where: {
        id: listId,
      },
      select: {
        status: true,
      },
    });
    const newList = await prisma.list.findFirst({
      where: {
        id: newListId,
      },
      select: {
        status: true,
        id: true,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found, please try again or refresh the page");
    }
    if (!oldList) {
      throw new Error(
        "Current list not found,  please try again or refresh the page",
      );
    }
    if (!newList) {
      throw new Error(
        "New list not found,  please try again or refresh the page",
      );
    }

    if (!orgId) {
      throw new Error(
        "Organization not found,  please try again or refresh the page",
      );
    }

    const response = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data: {
        listId: newListId,
      },
      select: {
        title: true,
      },
    });

    if (newList.status === "done" || oldList?.status === "done") {
      if (activeUserData?.role !== "admin") {
        revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
        throw new Error(
          "only admin can move a card ticket to or from DONE list ",
        );
      }
      if (foundCard.assignedToEmail) {
        await prisma.userDoneCardTickets.create({
          data: {
            cardId: cardId,
            assignedToEmail: foundCard.assignedToEmail,
            boardId: boardId,
            orgId: orgId,
          },
        });
      }
    }

    await createNewActivity({
      boardId: boardId,
      authorId: activeUserData?.activeUser.id,
      activity: `Changed card status from "${oldList.status}" to "${newList.status}", of card: "${response.title}"`,
      type: "updated",
    });
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return { data: newList.id, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
