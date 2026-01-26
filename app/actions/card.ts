"use server";

import { Card, PriorityType } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { currentActiveUser } from "@/lib/server/currentActiveUser";

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
  return { data: response, error: { message: "" } };
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
  const activeUser = await currentActiveUser();

  if (!activeUser || !activeUser?.data?.id) {
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

  const response = await prisma.card.create({
    data: {
      listId,
      listName: foundCard.listName,
      title: foundCard.title,
      priority: foundCard.priority,
      assignedToEmail: foundCard.assignedToEmail || null,
      reporterId: activeUser.data.id,
    },
  });

  await createNewActivity({
    boardId: boardId,
    authorId: activeUser.data.id,
    activity: `Created a copy of card: "${foundCard.title}" in new card: "${response.title}" from list: "${foundCard.listName}"`,
    type: "created",
  });

  return { data: response, error: { message: "" } };
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
  return { data: response, error: { message: "" } };
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
    activity: `Updated priority of card: "${response.title}" from list: "${response.listName}"`,
    type: "updated",
  });
  return { data: response, error: { message: "" } };
}

type AssignToCardActionProps = {
  cardId: string;
  listId: string;
  email: string;
  boardId: string;
};
export async function assignToCardAction({
  cardId,
  listId,
  email,
  boardId,
}: AssignToCardActionProps): Promise<{
  data: Card;
  error: { message: string };
}> {
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
      assignedToEmail: email,
    },
  });

  await createNewActivity({
    boardId: boardId,
    authorId: activeUser.data.id,
    activity: `Assigned "${email}" to card: "${response.title}" from list: "${response.listName}"`,
    type: "updated",
  });
  return { data: response, error: { message: "" } };
}
