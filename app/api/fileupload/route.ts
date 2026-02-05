import { prisma } from "@/lib/prisma";
import { createNewActivity } from "@/lib/server/createActivity";
import { currentActiveUser } from "@/lib/server/currentActiveUser";
import { getCardDetailsData } from "@/lib/server/getCardData";
import { DeleteFileBodyType, UploadFileBodyType } from "@/lib/types";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const body = await req.json();

    if (!body) {
      throw new Error("Invalid request body");
    }

    const {
      file,
      cardDetailsId,
      boardId,
      fileType,
      fileName,
    }: UploadFileBodyType = body;

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    // upload image to cloudinary and get the result
    const result = await cloudinary.uploader.upload(file, {
      folder: "taskmate",
      use_filename: true,
      unique_filename: false,
      resource_type: fileType,
    });
    console.log("🚀 ~ POST ~ result \n\n\n:", result);

    const userAlreadyAttachedfile = await prisma.attachments.findFirst({
      where: {
        cardId: cardDetailsId,
        authorId: activeUser.data.id,
      },
    });

    if (userAlreadyAttachedfile) {
      // IF USER ALREADY ATTACHED FILE

      const response = await prisma.uploadedFile.create({
        data: {
          attachmentId: userAlreadyAttachedfile.id,
          url: result.secure_url,
          name: fileName,
          type: fileType,
          fileId: result.public_id,
        },
      });

      if (!response) {
        throw new Error("The attachment was not created, please try again");
      }
    } else {
      // IF USER HAS NOT ATTACHED FILE (CREATE ATTACHMENT OBJ)
      const response = await prisma.attachments.create({
        data: {
          cardId: cardDetailsId,
          authorId: activeUser.data.id,
          files: {
            create: [
              {
                url: result.secure_url,
                name: fileName,
                type: fileType,
                fileId: result.public_id,
              },
            ],
          },
        },
      });

      if (!response) {
        throw new Error("Attachment not found");
      }
    }

    // GET UPDATED ATTACHMENTS AND RETURN TO CLIENT
    const allAttachments = await prisma.attachments.findMany({
      where: {
        cardId: cardDetailsId,
        files: {
          some: {
            //return oinly if there is at least a file
          },
        },
      },
      include: {
        files: true,
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!allAttachments) {
      throw new Error("Attachment not found");
    }

    await createNewActivity({
      cardId: cardDetailsId,
      boardId: boardId,
      authorId: activeUser.data.id,
      activity: `Uploaded a new attachment: "${fileName}" in card: "${cardResponse?.card?.title}" from list: "${cardResponse?.card?.listName}"`,
      type: "created",
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      statusCode: 200,
      data: allAttachments,
    });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    NextResponse.json({
      message: error.message || "something went wrong while uploading file",
      statusCode: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const activeUser = await currentActiveUser();

    if (!activeUser.data) {
      throw new Error("User not authorized");
    }

    const body = await req.json();

    if (!body) {
      throw new Error("Invalid request body");
    }

    const bodyData: DeleteFileBodyType = body;

    // upload image to cloudinary and get the result
    if (bodyData.type === "single") {
      if (!bodyData.cardDetailsId) {
        throw new Error("Card not found");
      }

      const cardResponse = await getCardDetailsData({
        cardDetailsId: bodyData.cardDetailsId,
      });

      if (!cardResponse) {
        throw new Error("Card not found");
      }
      // DELETE FROM CLOUD FILES
      const result = await cloudinary.uploader.destroy(bodyData.fileId, {
        resource_type: bodyData.fileType,
      });
      console.log("🚀 ~ DELETE ~ result:", result);

      if (!result || result?.result === "not found") {
        throw new Error("File not found");
      }

      // DELETE FROM DB FILES
      await prisma.uploadedFile.delete({
        where: {
          fileId: bodyData.fileId,
          id: bodyData.uploadFileId,
        },
      });

      await createNewActivity({
        cardId: bodyData.cardDetailsId,
        boardId: bodyData.boardId,
        authorId: activeUser.data.id,
        activity: `Deleted the attachment: ${bodyData.fileName} from card: "${cardResponse?.card?.title}" in list: "${cardResponse?.card?.listName}"`,
        type: "deleted",
      });

      // GET UPDATED ATTACHMENTS AND RETURN TO CLIENT
      const allAttachments = await prisma.attachments.findMany({
        where: {
          cardId: bodyData.cardDetailsId,
          files: {
            some: {
              //return oinly if there is at least a file
            },
          },
        },
        include: {
          files: true,
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!allAttachments) {
        throw new Error("Attachment not found");
      }

      return NextResponse.json({
        data: allAttachments,
        statusCode: 200,
        message: "Attachments deleted successfully",
      });
    }
    if (bodyData.type === "card") {
      // IF DELETE A CARD WITH ATTACHMENTS

      const allAttachmentsOfCurrentCard = await prisma.attachments.findMany({
        where: {
          cardId: bodyData.cardDetailsId,
          files: {
            some: {
              //return only if there is at least a file
            },
          },
        },
        include: {
          files: {
            select: {
              fileId: true,
              type: true,
            },
          },
        },
      });

      const imagesIds: string[] = [];
      const filesIds: string[] = [];
      allAttachmentsOfCurrentCard.forEach((attachment) => {
        attachment?.files.forEach((file) => {
          if (file.type === "image") {
            imagesIds.push(file.fileId);
          } else {
            filesIds.push(file.fileId);
          }
        });
      });

      // DELETE FILES FROM CLOUD, THE DB DATA DELETING I HANDLED BY SERVER ACTIONS
      if (imagesIds.length > 0) {
        const responseImages = await cloudinary.api.delete_resources(
          imagesIds,
          {
            resource_type: "image",
          },
        );

        if (responseImages.result === "not found") {
          throw new Error("Image not found");
        }
      }
      if (filesIds.length > 0) {
        const responseFiles = await cloudinary.api.delete_resources(filesIds, {
          resource_type: "raw",
        });

        if (responseFiles.result === "not found") {
          throw new Error("File not found");
        }
      }
    }

    if (bodyData.type === "list") {
      // IF DELETE A LIST WITH ATTACHMENTS OF ALL CARDS
      const allAttachmentsOfCurrentCard = await prisma.uploadedFile.findMany({
        where: {
          attachment: {
            card: {
              card: {
                list: {
                  boardId: bodyData.boardId,
                  id: bodyData.listId, //GET ALL ATTACH BASED ON DELETED LIST
                },
              },
            },
          },
        },
        select: {
          fileId: true,
          type: true,
        },
      });

      const imagesIds: string[] = [];
      const filesIds: string[] = [];
      allAttachmentsOfCurrentCard.forEach((file) => {
        if (file.type === "image") {
          imagesIds.push(file.fileId);
        } else {
          filesIds.push(file.fileId);
        }
      });

      // DELETE FILES FROM CLOUD, THE DB DATA DELETING I HANDLED BY SERVER ACTIONS
      if (imagesIds.length > 0) {
        const responseImages = await cloudinary.api.delete_resources(
          imagesIds,
          {
            resource_type: "image",
          },
        );
        if (responseImages.result === "not found") {
          throw new Error("Image not found");
        }
      }
      if (filesIds.length > 0) {
        const responseFiles = await cloudinary.api.delete_resources(filesIds, {
          resource_type: "raw",
        });
        if (responseFiles.result === "not found") {
          throw new Error("File not found");
        }
      }
    }

    if (bodyData.type === "board") {
      // IF DELETE A BOARD WITH ATTACHMENTS
      const allAttachmentsOfCurrentCard = await prisma.uploadedFile.findMany({
        where: {
          attachment: {
            card: {
              card: {
                list: {
                  boardId: bodyData.boardId,
                },
              },
            },
          },
        },
        select: {
          fileId: true,
          type: true,
        },
      });

      const imagesIds: string[] = [];
      const filesIds: string[] = [];
      allAttachmentsOfCurrentCard.forEach((file) => {
        if (file.type === "image") {
          imagesIds.push(file.fileId);
        } else {
          filesIds.push(file.fileId);
        }
      });

      // DELETE FILES FROM CLOUD, THE FILES FROM DB ARE DELETED BY SERVER ACTIONS.
      if (imagesIds.length > 0) {
        const responseImages = await cloudinary.api.delete_resources(
          imagesIds,
          {
            resource_type: "image",
          },
        );
        if (responseImages.result === "not found") {
          throw new Error("Image not found");
        }
      }
      if (filesIds.length > 0) {
        const responseFiles = await cloudinary.api.delete_resources(filesIds, {
          resource_type: "raw",
        });
        if (responseFiles.result === "not found") {
          throw new Error("File not found");
        }
      }
    }

    return NextResponse.json({
      data: [],
      statusCode: 200,
      message: "Attachments deleted successfully",
    });
  } catch (error: any) {
    console.log("🚀 ~ DELETE ~ error:", error);
    return NextResponse.json({
      data: [],
      error: error?.message || "Something went wrong deleting file",
      statusCode: 500,
      status: 500,
    });
  }
}
