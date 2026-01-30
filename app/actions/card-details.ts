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
import { currentActiveUser } from "@/lib/server/currentActiveUser";

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
        },

        checklist: true,
        dueDate: true,
      },
    });
    console.log("🚀 ~ getCardDetails ~ response:", response);

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
  data: Attachments[] | null;
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

type CreateAttachmentProps = {
  cardId: string;
  name: string;
  url: string;
  type: string;
  fileId: string;
  attachmentId: string;
};
export async function createAttachment({
  cardId,
  name,
  url,
  type,
  fileId,
}: CreateAttachmentProps): Promise<{
  data: Attachments | null;
  error: { message: string };
}> {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const hasUserAlreadyAttachedFile = await prisma.attachments.findFirst({
      where: {
        cardId,
        authorId: activeUser.data.id,
      },
    });

    if (hasUserAlreadyAttachedFile) {
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

    const response = await prisma.attachments.create({
      data: {
        cardId,
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

type DeleteAttachmentProps = {
  cardId: string;
  fileId: string;
  uploadId: string;
};
export async function deleteAttachment({
  fileId,
  uploadId,
}: DeleteAttachmentProps): Promise<{
  data: UploadedFile | null;
  error: { message: string };
}> {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
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

// ACTIVITIES
export async function getCardDetailsActivities(cardId: string): Promise<{
  data: Activity[] | null;
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

// COMMENTS
type CreateCommentProps = {
  cardId: string;
  comment: string;
};
export async function createCommentAction({
  cardId,
  comment,
}: CreateCommentProps): Promise<{
  data: (Comment & { author: User })[] | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.comment.create({
    data: {
      comment,
      cardId,
      authorId: activeUser.data.id,
    },
  });

  if (!response) {
    throw new Error("Comment not found");
  }

  const commentsData = await prisma.comment.findMany({
    where: {
      cardId,
    },
    include: {
      author: true,
    },
  });

  if (!commentsData) {
    throw new Error("Comments not found");
  }

  return {
    data: commentsData,
    error: { message: "" },
  };
}
type DeleteCommentProps = {
  cardId: string;
  commentId: string;
};
export async function deleteCommentAction({
  cardId,
  commentId,
}: DeleteCommentProps): Promise<{
  data: (Comment & { author: User })[] | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.comment.delete({
    where: {
      cardId,
      id: commentId,
    },
  });

  if (!response) {
    throw new Error("Comment not found");
  }

  const commentsData = await prisma.comment.findMany({
    where: {
      cardId,
    },
    include: {
      author: true,
    },
  });

  if (!commentsData) {
    throw new Error("Comments not found");
  }

  return {
    data: commentsData,
    error: { message: "" },
  };
}

// DESCRIPTION
type UpdateDescriptionProps = {
  cardId: string;
  description: string;
};
export async function updateDescriptionAction({
  cardId,
  description,
}: UpdateDescriptionProps): Promise<{
  data: string | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.cardDetails.update({
    data: {
      description,
    },
    where: {
      cardId,
    },
  });

  if (!response) {
    throw new Error("Card not found");
  }

  const responseDescription = response.description;

  return {
    data: responseDescription,
    error: { message: "" },
  };
}

// CHECKLIST
type UpdateChecklistProps = {
  cardId: string;
  title: string;
  isCompleted: boolean;
  checklistId: string;
};
export async function updateChecklistAction({
  cardId,
  title,
  isCompleted,
  checklistId,
}: UpdateChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const isChecklistExists = await prisma.checklist.findFirst({
    where: {
      cardId,
      id: checklistId,
    },
  });

  if (!isChecklistExists) {
    // IF ALREDY EXISTS
    const response = await prisma.checklist.create({
      data: {
        title,
        isCompleted,
        cardId,
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
      cardId,
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

  return {
    data: response,
    error: { message: "" },
  };
}

type DeleteChecklistProps = {
  cardId: string;
  checklistId: string;
};
export async function deleteChecklistAction({
  cardId,
  checklistId,
}: DeleteChecklistProps): Promise<{
  data: Checklist | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.checklist.delete({
    where: {
      cardId,
      id: checklistId,
    },
  });

  if (!response) {
    throw new Error("Card not found");
  }

  return {
    data: response,
    error: { message: "" },
  };
}

// DUE DATE

type CreateDuedateProps = {
  cardId: string;
  date: string;
  time: string;
};
export async function createDueDateAction({
  cardId,
  date,
  time,
}: CreateDuedateProps): Promise<{
  data: DueDate | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.dueDate.create({
    data: {
      cardId,
      date,
      time,
    },
  });

  if (!response) {
    throw new Error("Due date not found");
  }

  return {
    data: response,
    error: { message: "" },
  };
}

type DeleteDuedateProps = {
  cardId: string;
  dueDateId: string;
};
export async function deleteDueDateAction({
  cardId,
  dueDateId,
}: DeleteDuedateProps): Promise<{
  data: DueDate | null;
  error: { message: string };
}> {
  const activeUser = await currentActiveUser();

  if (!activeUser.data) {
    throw new Error("User not authorized");
  }

  const response = await prisma.dueDate.delete({
    where: {
      cardId,
      id: dueDateId,
    },
  });

  if (!response) {
    throw new Error("Due date not found");
  }

  return {
    data: response,
    error: { message: "" },
  };
}
