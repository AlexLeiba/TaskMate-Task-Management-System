"use server";
import {
  Card,
  List,
  PriorityType,
  StatusType,
} from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import {
  CardWithDetailsAndDueDateAndChecklistAndReporterType,
  FilterStates,
  ListAndCardsAndDueDateAndChecklistType,
  UserRoleType,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getListDataAction(
  boardId: string,
  priorityType?: PriorityType,
  selectedMemberEmail?: string,
  unassignedCard?: boolean,
  filters: FilterStates = "all",
): Promise<{
  data: {
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined;

    role: UserRoleType;
  } | null;
  error: { message: string };
}> {
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }
    const now = new Date();
    const sevenDaysAgo = new Date();
    const nextSevenDays = new Date();
    const oneDayInThePast = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    nextSevenDays.setDate(now.getDate() + 7);
    oneDayInThePast.setDate(now.getDate() - 1);

    const response = await prisma.list.findMany({
      where: {
        boardId,
        ...(selectedMemberEmail && {
          cards: {
            some: {
              assignedToEmail: selectedMemberEmail,
            },
          },
        }),
        ...(unassignedCard && {
          cards: {
            some: {
              assignedToEmail: null,
            },
          },
        }),
        ...(filters === "priority" && {
          cards: {
            some: {
              priority: priorityType,
            },
          },
        }),
        ...(filters === "dueSoon" && {
          cards: {
            some: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lte: nextSevenDays.toISOString(),
                      gte: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          },
        }),
        ...(filters === "expiredDue" && {
          cards: {
            some: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lt: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          },
        }),
        ...(filters === "created" && {
          cards: {
            some: {
              details: {
                createdAt: {
                  gte: sevenDaysAgo.toISOString(),
                },
              },
            },
          },
        }),
        ...(filters === "completed" && {
          status: StatusType.done,
        }),
      },
      include: {
        cards: {
          ...(selectedMemberEmail && {
            where: {
              assignedToEmail: selectedMemberEmail,
            },
          }),
          ...(unassignedCard && {
            where: {
              assignedToEmail: null,
            },
          }),
          ...(filters === "priority" && {
            where: {
              priority: priorityType,
            },
          }),
          ...(filters === "created" && {
            where: {
              details: {
                createdAt: {
                  gte: sevenDaysAgo.toISOString(),
                },
              },
            },
          }),
          ...(filters === "dueSoon" && {
            where: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lte: nextSevenDays.toISOString(),
                      gte: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          }),
          ...(filters === "expiredDue" && {
            where: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lt: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          }),
          include: {
            assignedTo: {
              select: {
                avatar: true,
                email: true,
              },
            },

            details: {
              select: {
                dueDate: {
                  select: {
                    date: true,
                    time: true,
                  },
                },
                checklist: {
                  select: {
                    id: true,
                    isCompleted: true,
                  },
                },
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
      data: {
        data: response,
        role: activeUserData.role,
      },
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

export async function getListDataTableViewAction(
  boardId: string,
  priorityType?: PriorityType,
  selectedMemberEmail?: string,
  unassignedCard?: boolean,
  filters: FilterStates = "all",
): Promise<{
  data: {
    data: {
      cards:
        | CardWithDetailsAndDueDateAndChecklistAndReporterType[]
        | null
        | undefined;
      listStatuses: {
        id: string;
        title: string;
        status: StatusType;
      }[];
    };
    role: UserRoleType;
  } | null;
  error: { message: string };
}> {
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }
    const now = new Date();
    const sevenDaysAgo = new Date();
    const nextSevenDays = new Date();
    const oneDayInThePast = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    nextSevenDays.setDate(now.getDate() + 7);
    oneDayInThePast.setDate(now.getDate() - 1);

    const response = await prisma.list.findMany({
      where: {
        boardId,
        ...(selectedMemberEmail && {
          cards: {
            some: {
              assignedToEmail: selectedMemberEmail,
            },
          },
        }),
        ...(unassignedCard && {
          cards: {
            some: {
              assignedToEmail: null,
            },
          },
        }),
        ...(filters === "priority" && {
          cards: {
            some: {
              priority: priorityType,
            },
          },
        }),
        ...(filters === "dueSoon" && {
          cards: {
            some: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lte: nextSevenDays.toISOString(),
                      gte: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          },
        }),
        ...(filters === "expiredDue" && {
          cards: {
            some: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lt: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          },
        }),
        ...(filters === "created" && {
          cards: {
            some: {
              details: {
                createdAt: {
                  gte: sevenDaysAgo.toISOString(),
                },
              },
            },
          },
        }),
        ...(filters === "completed" && {
          status: StatusType.done,
        }),
      },
      include: {
        cards: {
          ...(selectedMemberEmail && {
            where: {
              assignedToEmail: selectedMemberEmail,
            },
          }),
          ...(unassignedCard && {
            where: {
              assignedToEmail: null,
            },
          }),
          ...(filters === "priority" && {
            where: {
              priority: priorityType,
            },
          }),
          ...(filters === "created" && {
            where: {
              details: {
                createdAt: {
                  gte: sevenDaysAgo.toISOString(),
                },
              },
            },
          }),
          ...(filters === "dueSoon" && {
            where: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lte: nextSevenDays.toISOString(),
                      gte: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          }),
          ...(filters === "expiredDue" && {
            where: {
              details: {
                dueDate: {
                  some: {
                    date: {
                      lt: oneDayInThePast.toISOString(),
                    },
                  },
                },
              },
            },
          }),
          include: {
            list: {
              select: {
                status: true,
              },
            },
            assignedTo: {
              select: {
                avatar: true,
                email: true,
                name: true,
              },
            },
            reporter: {
              select: {
                avatar: true,
                email: true,
                name: true,
              },
            },

            details: {
              select: {
                dueDate: {
                  select: {
                    date: true,
                    time: true,
                  },
                },
                checklist: {
                  select: {
                    id: true,
                    isCompleted: true,
                  },
                },
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

    const listStatusesResponse = await prisma.list.findMany({
      where: {
        boardId,
      },
      select: {
        id: true,
        status: true,
        title: true,
      },
    });

    if (!response || !listStatusesResponse) {
      throw new Error("List not found, please try again");
    }

    const allListCards: CardWithDetailsAndDueDateAndChecklistAndReporterType[] =
      [];
    response?.forEach((list) => {
      if (list?.cards) {
        allListCards.push(...list.cards);
      }
      return list?.cards;
    });

    return {
      data: {
        data: { cards: allListCards, listStatuses: listStatusesResponse },
        role: activeUserData.role,
      },
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
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
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
      authorId: activeUserData?.activeUser.id,
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
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
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
      authorId: activeUserData?.activeUser.id,
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
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();
    if (!activeUserData?.activeUser) {
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
      authorId: activeUserData?.activeUser.id,
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
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser?.id) {
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

    const reporterId = activeUserData?.activeUser.id;
    const response = await prisma.list.create({
      data: {
        title: `${listData.title} - Copy`,
        boardId,
        status: listData.status,
        order: countLists + 1,
        cards: {
          create: listData.cards.map((card) => ({
            title: card.title,
            reporterId: reporterId,
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
      authorId: activeUserData?.activeUser.id,
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
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!activeUserData?.activeUser) {
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
      authorId: activeUserData?.activeUser.id,
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
  const { data: activeUserData, error } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();
    if (error?.message || !activeUserData?.activeUser) {
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
        reporterId: activeUserData.activeUser.id,
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
      authorId: activeUserData.activeUser.id,
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
