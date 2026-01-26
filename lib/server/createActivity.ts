import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { ActivityActionType } from "../types";

export async function createNewActivity({
  boardId,
  authorId,

  activity,
  type,
}: {
  boardId: string;
  authorId: string;
  activity: string;
  type: ActivityActionType;
}) {
  const { orgId } = await auth();

  if (!orgId) throw new Error("User not authenticated");

  await prisma.activity.create({
    data: {
      boardId: type === "deleted" ? null : boardId,
      orgId,
      activity,
      authorId,
      type,
    },
  });
}
