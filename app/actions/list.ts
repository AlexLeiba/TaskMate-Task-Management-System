"use server";
import { Card, List, StatusType } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { currentActiveUser } from "@/lib/server/currentActiveUser";
import { revalidatePath } from "next/cache";

export type ListAndCardsType = List & { cards: Card[] };
export async function getListDataAction(
  boardId: string,
): Promise<{ data: ListAndCardsType[] | null; error: { message: string } }> {
  try {
    const { data: activeUser } = await currentActiveUser();

    if (!activeUser) {
      throw new Error("User not authorized");
    }

    const response = await prisma.list.findMany({
      where: {
        boardId,
      },
      include: {
        cards: true,
      },
    });

    if (!response) {
      throw new Error("List not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ getListDataAction ~ error:", error);
    return {
      data: null,
      error: { message: error?.message || "Something went wrong" },
    };
  }
}
export async function createListAction({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();

  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }

  const response = await prisma.list.create({
    data: {
      boardId,
      title,
    },
  });

  await createNewActivity({
    boardId: response.boardId as string,
    authorId: activeUser.id,
    activity: `Created new list "${response.title}" in Board "${boardData.title}"`,
    type: "created",
  });

  revalidatePath(`/board/${boardId}`);
  return {
    data: response,
    error: { message: "" },
  };
}
export async function updateListTitleAction({
  boardId,
  title,
  listId,
}: {
  boardId: string;
  title: string;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();

  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }

  const prevListData = await prisma.list.findFirst({
    where: {
      boardId,
      id: listId,
    },
  });

  if (!prevListData) {
    throw new Error("List not found");
  }

  const response = await prisma.list.update({
    where: {
      boardId,
      id: listId,
    },
    data: {
      title,
    },
  });

  await createNewActivity({
    boardId: response.boardId as string,
    authorId: activeUser.id,
    activity: `Updated list title from "${prevListData.title}" to "${response.title}" in Board "${boardData.title}"`,
    type: "updated",
  });

  revalidatePath(`/board/${boardId}`);
  return {
    data: response,
    error: { message: "" },
  };
}

export async function updateListStatusAction({
  boardId,
  status,
  listId,
}: {
  boardId: string;
  status: StatusType;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();
  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }

  const prevListData = await prisma.list.findFirst({
    where: {
      boardId,
      id: listId,
    },
  });

  if (!prevListData) {
    throw new Error("List not found");
  }

  const response = await prisma.list.update({
    where: {
      boardId,
      id: listId,
    },
    data: {
      status,
    },
  });

  await createNewActivity({
    boardId: response.boardId as string,
    authorId: activeUser.id,
    activity: `Updated list status from "${prevListData.status}" to "${response.status}" in Board "${boardData.title}"`,
    type: "updated",
  });

  return {
    data: response,
    error: { message: "" },
  };
}

export async function copyListAction({
  boardId,
  listId,
}: {
  boardId: string;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();

  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const listData = await prisma.list.findFirst({
    where: {
      boardId,
      id: listId,
    },
  });

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }
  if (!listData) {
    throw new Error("List not found");
  }

  const response = await prisma.list.create({
    data: {
      title: `${listData.title} - Copy`,
      boardId,
      status: listData.status,
    },
  });

  await createNewActivity({
    boardId: response.boardId as string,
    authorId: activeUser.id,
    activity: `Created new list "${listData.title} - Copy" in Board "${boardData.title}"`,
    type: "created",
  });

  revalidatePath(`/board/${boardId}`);

  return {
    data: response,
    error: { message: "" },
  };
}

export async function deleteListAction({
  boardId,
  listId,
}: {
  boardId: string;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();

  if (!activeUser) {
    throw new Error("User not authorized");
  }

  const listData = await prisma.list.findFirst({
    where: {
      boardId,
      id: listId,
    },
  });

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }
  if (!listData) {
    throw new Error("List not found");
  }

  const response = await prisma.list.delete({
    where: {
      id: listId,
      boardId,
    },
  });

  await createNewActivity({
    boardId: response.boardId as string,
    authorId: activeUser.id,
    activity: `Deleted the list "${listData.title}" from Board "${boardData.title}"`,
    type: "deleted",
  });

  revalidatePath(`/board/${boardId}`);
  return {
    data: response,
    error: { message: "" },
  };
}

export async function createListCardAction({
  boardId,
  listId,
  title,
}: {
  boardId: string;
  listId: string;
  title: string;
}): Promise<{ data: Card | null; error: { message: string } }> {
  const { data: activeUser } = await currentActiveUser();
  if (!activeUser) {
    throw new Error("User not authorized");
  }
  const listData = await prisma.list.findFirst({
    where: {
      boardId,
      id: listId,
    },
  });

  const boardData = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardData) {
    throw new Error("Board not found");
  }
  if (!listData) {
    throw new Error("List not found");
  }

  const response = await prisma.card.create({
    data: {
      title,
      listId,
      reporterId: activeUser.id,
      listName: listData.title,

      details: {
        create: {
          description: "",

          // dueDate: {
          //   create: {
          //     date: "",
          //     time: "",
          //   },
          // },
          // checklist: {
          //   create: {
          //     title: "",
          //     isCompleted: false,
          //   },
          // },
          // comments: {
          //   create: {
          //     comment: "",
          //     authorId: activeUser.id,
          //   },
          // },
          // attachments: {
          //   create: {
          //     authorId: activeUser.id,
          //     files: {
          //       create: [],
          //     },
          //   },
          // },
        },
      },
    },
  });

  await createNewActivity({
    boardId: boardData.id as string,
    authorId: activeUser.id,
    activity: `Created new card "${response.title} in List "${listData.title}" in Board "${boardData.title}"`,
    type: "created",
  });

  revalidatePath(`/board/${boardId}`);

  return {
    data: response,
    error: { message: "" },
  };
}
