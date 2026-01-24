import { prisma } from "../prisma";
import { ActivityActionType } from "../types";

export async function createNewActivity({
  boardId,
  authorId,
  orgId,
  activity,
  type,
}: {
  boardId: string;
  authorId: string;
  orgId: string;
  activity: string;
  type: ActivityActionType;
}) {
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
