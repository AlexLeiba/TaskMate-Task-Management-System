"use server";

import {
  Activity,
  Attachments,
  Card,
  CardDetails,
  Checklist,
  Comment,
  DueDate,
  UploadedFile,
  User,
} from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";
import { getCardDetailsData } from "@/lib/server/getCardData";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CardDetailsType = CardDetails & {
  card: Card & {
    reporter: User;
  };
  comments: (Comment & {
    author: User;
  })[];
  checklist: Checklist[];
  dueDate: DueDate[];
};

// CARD DETAILS
export async function getCardDetails(
  cardId: string,
): Promise<{ data: CardDetailsType | null; error: { message: string } }> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.cardDetails.findFirst({
      where: {
        cardId,
      },
      include: {
        card: {
          include: {
            reporter: true,
          },
        },

        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },

        checklist: true,
        dueDate: true,
      },
    });

    if (!response) {
      throw new Error("Card not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
export async function getCardDetailsComments(cardId: string): Promise<{
  data: (Comment & { author: User })[] | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.comment.findMany({
      where: {
        cardId,
      },
      include: {
        author: true,
      },
    });

    if (!response) {
      throw new Error("Comment not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

// ATTACHMENTS
export async function getCardDetailsAttachments(cardId: string): Promise<{
  data: (Attachments & { author: User } & { files: UploadedFile[] })[] | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.attachments.findMany({
      where: {
        cardId,
        files: {
          some: {},
        },
      },
      include: {
        author: true,
        files: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!response) {
      throw new Error("Attachment not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

type CreateAttachmentProps = {
  cardDetailsId: string;
  name: string;
  url: string;
  type: string;
  fileId: string;
  boardId: string;
};
export async function createAttachment({
  cardDetailsId,
  name,
  url,
  type,
  fileId,
  boardId,
}: CreateAttachmentProps): Promise<{
  data: Attachments | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const hasUserAlreadyAttachedFile = await prisma.attachments.findFirst({
      where: {
        cardId: cardDetailsId,
        authorId: activeUser.data.id,
      },
    });

    if (hasUserAlreadyAttachedFile) {
      // IF USER ALREADY ATTACHED FILE
      const response = await prisma.uploadedFile.create({
        data: {
          attachmentId: hasUserAlreadyAttachedFile.id,
          url,
          name,
          type,
          fileId,
        },
      });

      if (!response) {
        throw new Error("Attachment not found");
      }

      return {
        data: hasUserAlreadyAttachedFile,
        error: { message: "" },
      };
    }

    // IF USER HAS NOT ATTACHED FILE
    const response = await prisma.attachments.create({
      data: {
        cardId: cardDetailsId,
        authorId: activeUser.data.id,
        files: {
          create: [
            {
              url,
              name,
              type,
              fileId,
            },
          ],
        },
      },
    });

    if (!response) {
      throw new Error("Attachment not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Uploaded a new attachment: "${name}" in card: "${cardResponse?.card?.title}" from list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type DeleteAttachmentProps = {
  cardDetailsId: string;
  fileId: string;
  uploadId: string;
  boardId: string;
};
export async function deleteAttachment({
  fileId,
  uploadId,
  cardDetailsId,
  boardId,
}: DeleteAttachmentProps): Promise<{
  data: UploadedFile | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.uploadedFile.delete({
      where: {
        fileId,
        id: uploadId,
      },
    });

    if (!response) {
      throw new Error("File not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Deleted an attachment: "${name}" from card: "${cardResponse?.card?.title}" from list: "${cardResponse?.card?.listName}"`,
      type: "deleted",
    });
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

// ACTIVITIES
export async function getCardDetailsActivities(cardId: string): Promise<{
  data:
    | (Activity & {
        author: User;
      })[]
    | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.activity.findMany({
      where: {
        cardId,
      },
      include: {
        author: true,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!response) {
      throw new Error("Activities not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

// COMMENTS
type CreateCommentProps = {
  cardDetailsId: string;
  comment: string;
  boardId: string;
};
export async function createCommentAction({
  cardDetailsId,
  comment,
  boardId,
}: CreateCommentProps): Promise<{
  data: (Comment & { author: User })[] | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.comment.create({
      data: {
        comment,
        cardId: cardDetailsId,
        authorId: activeUser.data.id,
      },
    });

    if (!response) {
      throw new Error("Comment not found");
    }

    const commentsData = await prisma.comment.findMany({
      where: {
        cardId: cardDetailsId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!commentsData) {
      throw new Error("Comments not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Created a comment in the card: "${cardResponse?.card?.title}" from the list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    return {
      data: commentsData,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
type DeleteCommentProps = {
  cardDetailsId: string;
  commentId: string;
  boardId: string;
};
export async function deleteCommentAction({
  cardDetailsId,
  commentId,
  boardId,
}: DeleteCommentProps): Promise<{
  data: (Comment & { author: User })[] | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }
    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.comment.delete({
      where: {
        cardId: cardDetailsId,
        id: commentId,
      },
    });

    if (!response) {
      throw new Error("Comment not found");
    }

    const commentsData = await prisma.comment.findMany({
      where: {
        cardId: cardDetailsId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!commentsData) {
      throw new Error("Comments not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Deleted a comment from the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "deleted",
    });

    return {
      data: commentsData,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

// DESCRIPTION
type UpdateDescriptionProps = {
  cardDetailsId: string;
  description: string;
  boardId: string;
};
export async function updateDescriptionAction({
  cardDetailsId,
  description,
  boardId,
}: UpdateDescriptionProps): Promise<{
  data: string | null;
  error: { message: string };
}> {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.cardDetails.update({
      data: {
        description,
      },
      where: {
        id: cardDetailsId,
      },
    });

    if (!response) {
      throw new Error("Card not found");
    }

    const responseDescription = response.description;

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Updated the description from the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "updated",
    });
    return {
      data: responseDescription,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

// CHECKLIST
type GetChecklistProps = {
  cardDetailsId: string;
};
export async function getChecklistDataAction({
  cardDetailsId,
}: GetChecklistProps) {
  try {
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.checklist.findMany({
      where: {
        cardId: cardDetailsId,
      },
    });

    if (!response) {
      throw new Error("Checklist not found");
    }

    return response;
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type CreateChecklistProps = {
  cardDetailsId: string;
  title: string;
  boardId: string;
};
export async function createChecklistAction({
  cardDetailsId,
  title,
  boardId,
}: CreateChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    // IF ALREDY EXISTS
    const response = await prisma.checklist.create({
      data: {
        title,
        isCompleted: false,
        cardId: cardDetailsId,
      },
    });

    if (!response) {
      throw new Error("Checklist was not created");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Created the checklist in the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    // REVALIDATE BOARD DATA TO SHOW UPDATED CHECKLIST DATA
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type UpdateChecklistProps = {
  cardDetailsId: string;

  checklistId: string;
  boardId: string;
};
export async function updateChecklistAction({
  cardDetailsId,

  checklistId,
  boardId,
}: UpdateChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const isChecklistExists = await prisma.checklist.findFirst({
      where: {
        cardId: cardDetailsId,
        id: checklistId,
      },
    });

    if (!isChecklistExists) {
      throw new Error("Checklist was not found");
    }

    const response = await prisma.checklist.update({
      where: {
        cardId: cardDetailsId,
        id: checklistId,
      },
      data: {
        isCompleted: !isChecklistExists.isCompleted,
      },
    });

    if (!response) {
      throw new Error("Checklist was not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Updated the checklist from the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "updated",
    });
    // REVALIDATE BOARD DATA TO SHOW UPDATED CHECKLIST DATA
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type DeleteChecklistProps = {
  cardDetailsId: string;
  checklistId: string;
  boardId: string;
};
export async function deleteChecklistAction({
  cardDetailsId,
  checklistId,
  boardId,
}: DeleteChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.checklist.delete({
      where: {
        cardId: cardDetailsId,
        id: checklistId,
      },
    });

    if (!response) {
      throw new Error("Card not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Deleted a checklist item from the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "deleted",
    });

    // REVALIDATE BOARD DATA TO SHOW UPDATED CHECKLIST DATA
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

// DUE DATE

type CreateDuedateProps = {
  cardDetailsId: string;
  date: string;
  time: string;
  boardId: string;
};
export async function createDueDateAction({
  cardDetailsId,
  date,
  time,
  boardId,
}: CreateDuedateProps): Promise<{
  data: DueDate | null;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.dueDate.create({
      data: {
        cardId: cardDetailsId,
        date,
        time,
      },
    });

    if (!response) {
      throw new Error("Due date not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Created due date in the card: "${cardResponse?.card?.title}" from the list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    // REVALIDATE BOARD DATA TO SHOW UPDATED DUE DATE DATA
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type DeleteDuedateProps = {
  cardDetailsId: string;
  dueDateId: string;
  boardId: string;
};
export async function deleteDueDateAction({
  cardDetailsId,
  dueDateId,
  boardId,
}: DeleteDuedateProps): Promise<{
  data: DueDate | null;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.dueDate.delete({
      where: {
        cardId: cardDetailsId,
        id: dueDateId,
      },
    });

    if (!response) {
      throw new Error("Due date not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Deleted due date from the card: "${cardResponse?.card?.title}" in the list: "${cardResponse?.card?.listName}"`,
      type: "deleted",
    });

    // REVALIDATE BOARD DATA TO SHOW UPDATED DUE DATE DATA
    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);

    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

type CopyCardWithDetailsProps = {
  cardDetailsId: string;
  boardId: string;
  cardId: string;
};
export async function copyCardWithDetails({
  cardDetailsId,
  boardId,
  cardId,
}: CopyCardWithDetailsProps) {
  try {
    const { orgId } = await auth();
    const activeUser = await checkCurrentActiveUser();

    if (!activeUser.data) {
      redirect("/dashboard");
    }

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    const response = await prisma.card.create({
      data: {
        listId: cardResponse?.card?.listId,
        listName: cardResponse?.card?.listName,
        title: cardResponse?.card?.title,
        priority: cardResponse?.card?.priority,
        reporterId: activeUser.data.id,
        details: {
          create: {
            description: cardResponse?.description || "",
          },
        },
      },
    });

    await createNewActivity({
      cardId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Copied the card: "${cardResponse?.card?.title}" from the list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    revalidatePath(`/dashboard/${orgId}/board/${boardId}`);
    return {
      data: response,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ copyCardWithDetails ~ error:", error.message);
    throw error?.message || "Something went wrong";
  }
}
