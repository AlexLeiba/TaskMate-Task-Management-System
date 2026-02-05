"use server";

import { Board } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { currentActiveUser } from "@/lib/server/currentActiveUser";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getBoardDataAction(boardId: string): Promise<{
  data: Board | null;
  error: { message: string };
}> {
  try {
    const { data: activeUser } = await currentActiveUser();

    const { orgId } = await auth();

    if (!orgId || !activeUser) {
      throw new Error("User not authenticated");
    }

    const response = await prisma.board.findFirst({
      where: {
        orgId,
        id: boardId,
      },
    });

    return { data: response, error: { message: "" } };
  } catch (error: any) {
    console.log("🚀 ~ getBoardDataAction ~ error:", error);

    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function editBoardTitleAction({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}): Promise<{ data: Board | null; error: { message: string } }> {
  try {
    const { data: activeUser } = await currentActiveUser();

    const { orgId } = await auth();
    if (!orgId) {
      throw new Error("User not authenticated");
    }

    if (!activeUser) {
      throw new Error("User not authorized");
    }

    const prevBoardData = await prisma.board.findFirst({
      where: {
        orgId,
        id: boardId,
      },
    });

    if (!prevBoardData) {
      throw new Error("Board not found");
    }

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
      cardId: null,
      boardId,
      authorId: activeUser.id,
      activity: `Updated board title from "${prevBoardData?.title}" to "${response.title}"`,
      type: "updated",
    });

    revalidatePath("/board");
    return { data: response, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
