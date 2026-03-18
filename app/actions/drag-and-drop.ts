"use server";
import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { createNewActivity } from "@/lib/server/createActivity";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type ChangeListPositionParams = {
  boardId: string;
  newOrderIndex: number;
  reorderedListId: string;
};
export async function changeListPositionAction({
  boardId,
  newOrderIndex = 1,
  reorderedListId,
}: ChangeListPositionParams): Promise<{
  data: boolean | null;
  error: { message: string };
}> {
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error("User not authenticated");
    }
    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const boardData = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });

    const reorderedList = await prisma.list.findFirst({
      where: {
        id: reorderedListId,
      },
    });

    if (!reorderedList) {
      throw new Error("List not found");
    }
    if (!boardData) {
      throw new Error("Board not found");
    }

    const oldListOrderIndex = reorderedList?.order;

    const lists = await prisma.list.findMany({
      where: { boardId },
      orderBy: { order: "asc" },
    });

    if (!lists) {
      throw new Error("Lists not found");
    }

    await prisma.$transaction(
      lists.map((list) => {
        if (list.id === reorderedListId) {
          return prisma.list.update({
            where: { id: list.id },
            data: { order: newOrderIndex },
          });
        }

        // moving to right
        if (oldListOrderIndex > newOrderIndex) {
          if (list.order >= newOrderIndex && list.order < oldListOrderIndex) {
            return prisma.list.update({
              where: { id: list.id },
              data: {
                order: list.order + 1,
              },
            });
          }
        }

        // moving to left
        if (oldListOrderIndex < newOrderIndex) {
          if (list.order <= newOrderIndex && list.order > oldListOrderIndex) {
            return prisma.list.update({
              where: { id: list.id },
              data: {
                order: list.order - 1,
              },
            });
          }
        }

        return prisma.list.update({
          where: { id: list.id },
          data: {
            order: list.order,
          },
        });
      }),
    );

    await createNewActivity({
      boardId: boardId as string,
      authorId: activeUserData?.activeUser.id,
      activity: `Reordered list "${reorderedList.title}" in Board "${boardData.title}"`,
      type: "updated",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: true,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ changeListPositionAction ~ error:", error);
    throw error.message || "Something went wrong";
  }
}

type ChangeCardPositionParams = {
  boardId: string;
  newOrderIndex: number;

  listTitle: string;

  sourceListId: string;
  destinationListId: string;

  cardToMoveId: string;

  type: "same-list" | "different-list";
};
export async function changeCardPositionAction({
  boardId,
  listTitle,
  destinationListId,
  cardToMoveId,
  newOrderIndex = 1,
  type,
  sourceListId,
}: ChangeCardPositionParams): Promise<{
  data: boolean | null;
  error: { message: string };
}> {
  const { data: activeUserData, error } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error("User not authenticated");
    }

    if (error?.message || !activeUserData?.activeUser) {
      throw new Error(error?.message || "User not authorized");
    }

    const boardData = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });

    const cardToBeMoved = await prisma.card.findFirst({
      where: {
        id: cardToMoveId,
      },
    });

    if (!cardToBeMoved) {
      throw new Error("Card not found, please try again or refresh the page");
    }

    if (!boardData) {
      throw new Error("Board not found");
    }

    const oldCardOrderIndex = cardToBeMoved?.order;

    // SAME LIST
    if (type === "same-list") {
      await prisma.$transaction(async (tx) => {
        // Moving UP
        if (oldCardOrderIndex > newOrderIndex) {
          await tx.card.updateMany({
            where: {
              listId: destinationListId,
              order: {
                gte: newOrderIndex,
                lt: oldCardOrderIndex,
              },
            },
            data: {
              order: { increment: 1 },
            },
          });
        }

        // Moving DOWN
        if (oldCardOrderIndex < newOrderIndex) {
          await tx.card.updateMany({
            where: {
              listId: destinationListId,
              order: {
                gt: oldCardOrderIndex,
                lte: newOrderIndex,
              },
            },
            data: {
              order: { decrement: 1 },
            },
          });
        }

        // Finally update moved card
        await tx.card.update({
          where: { id: cardToMoveId },
          data: { order: newOrderIndex },
        });
      });
    }

    // DIFFERENT LIST
    if (type === "different-list") {
      const destinationList = await prisma.list.findFirst({
        where: {
          id: destinationListId,
        },
      });
      const sourceList = await prisma.list.findFirst({
        where: {
          id: sourceListId,
        },
      });

      if (!destinationList) {
        throw new Error("Destination list not found");
      }
      if (!sourceList) {
        throw new Error("Source list not found");
      }

      // MOVE TO DONE STATUS LIST
      // ONLY ADMIN CAN MOVE TO OR FROM DONE LIST
      if (destinationList?.status === "done" || sourceList?.status === "done") {
        if (activeUserData?.role === "member") {
          revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
          throw new Error(
            "only admin can move a card ticket to or from DONE list ",
          );
        }

        // RECORD WHO HAS DONE THE TICKET CARD
        if (
          destinationList?.status === "done" &&
          cardToBeMoved?.assignedToEmail
        ) {
          // CHECK IF RECORD EXISTS FOR SPECIFIC ORG AND BOARD.

          await prisma.userDoneCardTickets.create({
            data: {
              cardId: cardToMoveId,
              assignedToEmail: cardToBeMoved.assignedToEmail,
              boardId: boardData.id as string,
              orgId: orgId,
            },
          });
        }
      }

      await prisma.$transaction(async (tx) => {
        //Close gap in SOURCE list
        await tx.card.updateMany({
          where: {
            listId: sourceListId,
            order: {
              gt: oldCardOrderIndex,
            },
          },
          data: {
            order: { decrement: 1 },
          },
        });

        // Make space in DESTINATION list
        await tx.card.updateMany({
          where: {
            listId: destinationListId,
            order: {
              gte: newOrderIndex,
            },
          },
          data: {
            order: { increment: 1 },
          },
        });

        //  Move the card
        await tx.card.update({
          where: { id: cardToMoveId },
          data: {
            listId: destinationListId,
            order: newOrderIndex,
          },
        });
      });
    }

    await createNewActivity({
      boardId: boardData.id as string,
      authorId: activeUserData?.activeUser.id,
      activity: `Reordered card "${cardToBeMoved.title}" in List "${listTitle}" in Board "${boardData.title}"`,
      type: "updated",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);

    return {
      data: true,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ changeCardPositionAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}
