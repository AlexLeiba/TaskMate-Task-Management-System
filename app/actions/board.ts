"use server";

import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { getActiveUser } from "@/lib/server/currentActiveUser";
import { BoardType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getBoardDataAction(boardId: string): Promise<{
  data: BoardType | null;
  error: { message: string };
}> {
  try {
    const user = await auth();
    const { orgId } = await auth();
    if (!orgId || !user.userId) {
      return {
        data: null,
        error: { message: "User not authenticated" },
      };
    }

    const response = await prisma.board.findFirst({
      where: {
        orgId,
        id: boardId,
      },
    });

    return { data: response, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ getBoardDataAction ~ error:", error);

    return { data: null, error: { message: "Something went wrong" } };
  }
}

export async function editBoardTitleAction({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}): Promise<{ data: BoardType | null; error: { message: string } }> {
  try {
    const user = await getActiveUser();
    const { orgId } = await auth();
    if (!orgId || !user) {
      return {
        data: null,
        error: { message: "User not authenticated" },
      };
    }
    const prevBoardData = await prisma.board.findFirst({
      where: {
        orgId,
        id: boardId,
      },
    });

    const response = await prisma.board.update({
      where: {
        id: boardId,
        orgId,
      },
      data: {
        title,
      },
    });

    await createNewActivity({
      boardId,
      authorId: user.id,
      activity: `Updated board title from "${prevBoardData?.title}" to "${response.title}"`,
      type: "updated",
      orgId: orgId,
    });

    revalidatePath("/board");
    return { data: response, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ editBoardTitleAction ~ error:", error);
    return { data: null, error: { message: "Something went wrong" } };
  }
}
