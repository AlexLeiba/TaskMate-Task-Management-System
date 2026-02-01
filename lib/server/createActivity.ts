import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { ActivityActionType } from "../types";

export async function createNewActivity({
  boardId,
  authorId,
  cardId = null,
  activity,
  type,
}: {
  boardId: string;
  authorId: string;
  activity: string;
  cardId?: string | null;
  type: ActivityActionType;
}) {
  const { orgId } = await auth();

  if (!orgId) throw new Error("User not authenticated");

  await prisma.activity.create({
    data: {
      boardId: type === "deleted" ? null : boardId,
      cardId,
      orgId,
      activity,
      authorId,
      type,
    },
  });
}
