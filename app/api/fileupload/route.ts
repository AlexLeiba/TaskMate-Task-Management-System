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

    const {
      id,
      fileId,
      cardDetailsId,
      boardId,
      type,
      fileName,
      fileType,
    }: DeleteFileBodyType = body;
    console.log("🚀 ~ DELETE ~ fileId:", fileId);

    const cardResponse = await getCardDetailsData({ cardDetailsId });

    if (!cardResponse) {
      throw new Error("Card not found");
    }

    // upload image to cloudinary and get the result
    if (type === "single") {
      const result = await cloudinary.uploader.destroy(fileId, {
        resource_type: fileType,
      });
      console.log("🚀 ~ DELETE ~ result:", result);

      if (!result || result?.result === "not found") {
        throw new Error("File not found");
      }

      await prisma.uploadedFile.delete({
        where: {
          fileId,
          id,
        },
      });

      await createNewActivity({
        cardId: cardDetailsId,
        boardId: boardId,
        authorId: activeUser.data.id,
        activity: `Deleted the attachment: ${fileName} from card: "${cardResponse?.card?.title}" in list: "${cardResponse?.card?.listName}"`,
        type: "deleted",
      });
    }
    if (type === "card") {
      // IF DELETE A CARD WITH ATTACHMENTS

      const allResourcesOfCurrentCard = await prisma.attachments.findMany({
        where: {
          cardId: cardDetailsId,
          files: {
            some: {
              //return oinly if there is at least a file
            },
          },
        },
        include: {
          files: {
            select: {
              fileId: true,
            },
          },
        },
      });
      if (!allResourcesOfCurrentCard) {
        throw new Error("Attachments not found");
      }

      const allFilesIds = allResourcesOfCurrentCard.map((attachment) => {
        return attachment?.files.map((file) => {
          return file?.fileId;
        });
      })[0];
      const response = await cloudinary.api.delete_resources(allFilesIds);
      console.log("🚀 ~ DELETE ~ response:\n\n\n\n", response);

      if (response.result === "not found") {
        throw new Error("File not found");
      }
      await prisma.attachments.deleteMany({
        where: {
          cardId: cardDetailsId,
        },
      });
    }

    if (type === "board") {
      // IF DELETE A BOARD WITH ATTACHMENTS
      const allResourcesOfCurrentBoard = await prisma.uploadedFile.findMany({
        where: {
          attachment: {
            card: {
              card: {
                list: {
                  boardId,
                },
              },
            },
          },
        },
        select: {
          fileId: true,
        },
      });
      if (!allResourcesOfCurrentBoard) {
        throw new Error("Attachments not found");
      }

      const allFilesIds = allResourcesOfCurrentBoard?.map((file) => {
        return file?.fileId;
      });
      const response = await cloudinary.api.delete_resources(allFilesIds);
      if (response.result === "not found") {
        throw new Error("File not found");
      }
      await prisma.uploadedFile.deleteMany({
        where: {
          attachment: {
            card: {
              card: {
                list: {
                  boardId,
                },
              },
            },
          },
        },
      });
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

    return NextResponse.json({
      data: allAttachments,
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
