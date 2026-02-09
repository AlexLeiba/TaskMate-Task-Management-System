"use server";

import { Board } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";
import { BoardType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getBoardsAction(orgId: string): Promise<{
  data: BoardType[];
  error: { message: string };
}> {
  const { data: activeUser, error } = await checkCurrentActiveUser(orgId);
  try {
    if (!activeUser || error?.message) {
      throw new Error(error?.message || "User not authorized");
    }

    const boards = await prisma.board.findMany({
      where: {
        orgId,
      },
      orderBy: {
        order: "asc",
      },
    });

    return { data: boards, error: { message: "" } };
  } catch (error: any) {
    console.log("🚀 ~ getBoardsAction ~ error:", error);
    return {
      data: [],
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function createNewBoardAction(
  boardData: Omit<Board, "id" | "createdAt" | "updatedAt">,
): Promise<{ data: boolean; error: { message: string } }> {
  try {
    const { data: activeUser } = await checkCurrentActiveUser();
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error("User not authenticated");
    }
    if (!activeUser) {
      throw new Error("User not authorized");
    }
    const countBoards = await prisma.board.count({
      where: {
        orgId,
      },
    });

    const newBoardOrder = countBoards + 1;

    const createdBoard = await prisma.board.create({
      data: { ...boardData, order: newBoardOrder },
    });

    await createNewActivity({
      boardId: createdBoard.id,
      authorId: activeUser.id,
      activity: `Created new board "${createdBoard.title}"`,
      type: "created",
    });

    revalidatePath("/dashboard");
    return { data: true, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

export async function deleteBoardAction(
  boardId: string,
): Promise<{ data: boolean; error: { message: string } }> {
  try {
    const { data: activeUser } = await checkCurrentActiveUser();

    const { orgId } = await auth();

    if (!orgId) {
      throw new Error("User not authenticated");
    }
    if (!activeUser) {
      throw new Error("User not authorized");
    }

    const boardToDelete = await prisma.board.findFirst({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!boardToDelete) {
      throw new Error("Board not found");
    }

    const deletedBoard = await prisma.board.delete({ where: { id: boardId } });

    await createNewActivity({
      boardId,
      authorId: activeUser.id,
      activity: `Deleted board "${deletedBoard.title}"`,
      type: "deleted",
    });

    revalidatePath("/dashboard");
    return { data: true, error: { message: "" } };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
