"use server";
import { Card, List, StatusType } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getListDataAction(
  boardId: string,
  currentOrgId: string | undefined | null,
): Promise<{
  data: ListAndCardsAndDueDateAndChecklistType[] | null;
  error: { message: string };
}> {
  try {
    const { data: activeUser } = await checkCurrentActiveUser(currentOrgId);

    if (!activeUser) {
      throw new Error("User not authorized");
    }

    const response = await prisma.list.findMany({
      where: {
        boardId,
      },
      include: {
        cards: {
          include: {
            details: {
              select: {
                dueDate: true,
                checklist: true,
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
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
  try {
    const { orgId } = await auth();
    const { data: activeUser } = await checkCurrentActiveUser();

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

    const countLists = await prisma.list.count({
      where: {
        boardId,
      },
    });

    const newListOrder = countLists + 1;

    const response = await prisma.list.create({
      data: {
        boardId,
        title,
        order: newListOrder,
      },
    });

    await createNewActivity({
      boardId: response.boardId as string,
      authorId: activeUser.id,
      activity: `Created new list "${response.title}" in Board "${boardData.title}"`,
      type: "created",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error.message || "Something went wrong";
  }
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
  try {
    const { orgId } = await auth();
    const { data: activeUser } = await checkCurrentActiveUser();

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

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
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
  try {
    const { orgId } = await auth();
    const { data: activeUser } = await checkCurrentActiveUser();
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
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

export async function copyListAction({
  boardId,
  listId,
}: {
  boardId: string;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  try {
    const { orgId } = await auth();
    const { data: activeUser } = await checkCurrentActiveUser();

    if (!activeUser) {
      throw new Error("User not authorized");
    }

    const listData = await prisma.list.findFirst({
      where: {
        boardId,
        id: listId,
      },
      include: {
        cards: {
          select: {
            title: true,
            order: true,
            details: {
              select: {
                description: true,
                checklist: true,
              },
            },
          },
        },
      },
    });

    const boardData = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });

    const countLists = await prisma.list.count({
      where: {
        boardId,
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
        order: countLists + 1,
        cards: {
          create: listData.cards.map((card) => ({
            title: card.title,
            reporterId: activeUser.id,
            listName: `${listData.title} - Copy`,
            order: card.order,
            details: {
              create: {
                description: card.details?.description || "",
                checklist: {
                  createMany: {
                    data:
                      card.details?.checklist?.map((item) => {
                        return {
                          title: item.title,
                          isCompleted: item.isCompleted,
                        };
                      }) || [],
                  },
                },
              },
            },
          })),
        },
      },
    });

    await createNewActivity({
      boardId: response.boardId as string,
      authorId: activeUser.id,
      activity: `Created new list "${listData.title} - Copy" in Board "${boardData.title}"`,
      type: "created",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ copyListAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}

export async function deleteListAction({
  boardId,
  listId,
}: {
  boardId: string;
  listId: string;
}): Promise<{ data: List | null; error: { message: string } }> {
  try {
    const { orgId } = await auth();
    const { data: activeUser } = await checkCurrentActiveUser();

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
    // RESET ORDER OF THE LISTS
    const startOrderFrom = 1;

    const lists = await prisma.list.findMany({
      where: { boardId },
      orderBy: { order: "asc" },
    });

    if (!lists) {
      throw new Error("Lists not found");
    }

    await prisma.$transaction(
      lists.map((list, index) =>
        prisma.list.update({
          where: { id: list.id },
          data: { order: startOrderFrom + index },
        }),
      ),
    );

    await createNewActivity({
      boardId: response.boardId as string,
      authorId: activeUser.id,
      activity: `Deleted the list "${listData.title}" from Board "${boardData.title}"`,
      type: "deleted",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
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
  const { data: activeUser, error } = await checkCurrentActiveUser();
  try {
    const { orgId } = await auth();
    if (error?.message || !activeUser) {
      throw new Error(error?.message || "User not authorized");
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

    const cardCount = await prisma.card.count({
      where: {
        listId,
      },
    });

    const newCardOrder = cardCount + 1;

    const response = await prisma.card.create({
      data: {
        title,
        listId,
        reporterId: activeUser.id,
        listName: listData.title,
        order: newCardOrder,

        details: {
          create: {
            description: "",
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

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
