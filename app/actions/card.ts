"use server";

import { Card, PriorityType, User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import {
  createNewUser,
  currentActiveUser,
} from "@/lib/server/currentActiveUser";

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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });

    if (!foundCard) {
      throw new Error("Card not found");
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
      authorId: activeUser.data.id,
      activity: `Updated card title from "${foundCard.title}" to "${response.title}" from list: "${foundCard.listName}"`,
      type: "updated",
    });
    revalidatePath(`/board/${boardId}`);
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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser || !activeUser?.data?.id) {
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

    if (!foundCard) {
      throw new Error("Card not found");
    }

    const response = await prisma.card.create({
      data: {
        listId,
        listName: foundCard.listName,
        title: foundCard.title + " - copy",
        reporterId: activeUser.data.id,
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
      authorId: activeUser.data.id,
      activity: `Created a copy of card: "${foundCard.title}" in new card: "${response.title}" from list: "${foundCard.listName}"`,
      type: "created",
    });
    revalidatePath(`/board/${boardId}`);
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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found");
    }
    const response = await prisma.card.delete({
      where: {
        id: cardId,
        listId,
      },
    });

    await createNewActivity({
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Deleted card: "${response.title}" from list: "${response.listName}"`,
      type: "deleted",
    });

    revalidatePath(`/board/${boardId}`);
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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found");
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
      authorId: activeUser.data.id,
      activity: `Updated priority from "${foundCard.priority}" to "${response.priority}" ,of card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/board/${boardId}`);
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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    if (activeUser.data.email !== assignedUserData.email) {
      await createNewUser({ data: assignedUserData });
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found");
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
      authorId: activeUser.data.id,
      activity: `Assigned "${assignedUserData.name}" to card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/board/${boardId}`);
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
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const foundCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId,
      },
    });
    if (!foundCard) {
      throw new Error("Card not found");
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
      authorId: activeUser.data.id,
      activity: `Unassigned "${assignedUserData.name}" from card: "${response.title}" from list: "${response.listName}"`,
      type: "updated",
    });
    revalidatePath(`/board/${boardId}`);
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
