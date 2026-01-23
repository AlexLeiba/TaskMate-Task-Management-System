"use server";

import { prisma } from "@/lib/prisma";
import { ActivityActionType, BoardType } from "@/lib/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function currentUserInDBData(userData: {
  email: string;
  name: string;
  imageUrl: string;
}) {
  let activeUser = await prisma.user.findFirst({
    where: { email: userData.email },
  });

  if (!activeUser) {
    activeUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        avatar: userData.imageUrl,
      },
    });
  }

  return activeUser;
}

async function createNewActivity({
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

export async function getBoardsAction(): Promise<{
  data: BoardType[];
  error: { message: string };
}> {
  const user = await currentUser();

  if (!user) {
    return { data: [], error: { message: "User not authenticated" } };
  }

  try {
    const boards = await prisma.board.findMany({});

    return { data: boards, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ getBoardsAction ~ error:", error);
    return { data: [], error: { message: "Something went wrong" } };
  }
}

export async function createNewBoardAction(
  boardData: Omit<BoardType, "id">,
): Promise<{ data: boolean; error: { message: string } }> {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const { orgId } = await auth();

  if (!user || !userEmail || !orgId) {
    return { data: false, error: { message: "User not authenticated" } };
  }

  try {
    const createdBoard = await prisma.board.create({ data: boardData });

    const activeUser = await currentUserInDBData({
      email: userEmail,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
    });

    if (!activeUser) {
      throw new Error("User not found");
    }

    await createNewActivity({
      boardId: createdBoard.id,
      authorId: activeUser.id,
      activity: `Created new board "${createdBoard.title}"`,
      type: "created",
      orgId: createdBoard.orgId,
    });

    revalidatePath("/dashboard");
    return { data: true, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ createNewBoardAction ~ error:", error);
    return { data: false, error: { message: "" } };
  }
}

export async function deleteBoardAction(
  boardId: string,
): Promise<{ data: boolean; error: { message: string } }> {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const { orgId } = await auth();
  if (!user || !userEmail || !orgId) {
    return { data: false, error: { message: "User not authenticated" } };
  }

  try {
    const deletedBoard = await prisma.board.delete({ where: { id: boardId } });

    if (!deletedBoard)
      return { data: false, error: { message: "Board not found" } };

    const activeUser = await currentUserInDBData({
      email: userEmail,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
    });

    if (!activeUser) {
      throw new Error("User not found");
    }

    await createNewActivity({
      boardId,
      authorId: activeUser.id,
      activity: `Deleted board "${deletedBoard.title}"`,
      type: "deleted",
      orgId: deletedBoard.orgId,
    });

    revalidatePath("/dashboard");
    return { data: true, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ deleteBoardAction ~ error:", error);
    return {
      data: false,
      error: { message: "Something went wrong, please try again" },
    };
  }
}
