"use server";

import { Board } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { currentActiveUser } from "@/lib/server/currentActiveUser";
import { BoardType } from "@/lib/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getBoardsAction(orgId: string): Promise<{
  data: BoardType[];
  error: { message: string };
}> {
  try {
    const user = await currentUser();

    if (!user) {
      return { data: [], error: { message: "User not authenticated" } };
    }

    const boards = await prisma.board.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
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
  const { data: activeUser } = await currentActiveUser();
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("User not authenticated");
  }
  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const createdBoard = await prisma.board.create({ data: boardData });

  await createNewActivity({
    boardId: createdBoard.id,
    authorId: activeUser.id,
    activity: `Created new board "${createdBoard.title}"`,
    type: "created",
  });

  revalidatePath("/dashboard");
  return { data: true, error: { message: "" } };
}

export async function deleteBoardAction(
  boardId: string,
): Promise<{ data: boolean; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();

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
}
