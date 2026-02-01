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
import { currentActiveUser } from "@/lib/server/currentActiveUser";
import { getCardDetailsData } from "@/lib/server/getCardData";

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
  console.log("🚀 ~ getCardDetails ~ cardId:", cardId);
  try {
    const activeUser = await currentActiveUser();

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

// ATTACHMENTS
export async function getCardDetailsAttachments(cardId: string): Promise<{
  data: (Attachments & { author: User } & { files: UploadedFile[] })[] | null;
  error: { message: string };
}> {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const response = await prisma.attachments.findMany({
      where: {
        cardId,
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
  const activeUser = await currentActiveUser();

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
  const activeUser = await currentActiveUser();

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
    const activeUser = await currentActiveUser();

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
  const activeUser = await currentActiveUser();

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
  const activeUser = await currentActiveUser();

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
  const activeUser = await currentActiveUser();

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
}

// CHECKLIST
type UpdateChecklistProps = {
  cardDetailsId: string;
  title: string;
  isCompleted: boolean;
  checklistId: string;
  boardId: string;
};
export async function updateChecklistAction({
  cardDetailsId,
  title,
  isCompleted,
  checklistId,
  boardId,
}: UpdateChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

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
    // IF ALREDY EXISTS
    const response = await prisma.checklist.create({
      data: {
        title,
        isCompleted,
        cardId: cardDetailsId,
      },
    });
    if (!response) {
      throw new Error("Checklist was not found");
    }

    return {
      data: response,
      error: { message: "" },
    };
  }

  const response = await prisma.checklist.update({
    where: {
      cardId: cardDetailsId,
      id: checklistId,
    },
    data: {
      title,
      isCompleted,
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

  return {
    data: response,
    error: { message: "" },
  };
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
  const activeUser = await currentActiveUser();

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

  return {
    data: response,
    error: { message: "" },
  };
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
  const activeUser = await currentActiveUser();

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

  return {
    data: response,
    error: { message: "" },
  };
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
  const activeUser = await currentActiveUser();

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

  return {
    data: response,
    error: { message: "" },
  };
}
