"use server";
import { Notification, UserNotification } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { revalidatePath } from "next/cache";

export async function getNotificationsAction({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
  orgId?: string;
}): Promise<{
  data: (UserNotification & { notification: Notification })[];
  paginationCount: number;
  unreadCount: number;
  isAdmin: boolean;
  error: { message: string };
}> {
  const { data: activeUser } = await verifyCurrentActiveUser();
  try {
    if (!activeUser?.activeUser) {
      throw new Error("User not authenticated");
    }

    const [unreadCount, paginationCount, response] = await Promise.all([
      prisma.userNotification.count({
        where: {
          userId: activeUser.activeUser.id,
          read: false,
        },
      }),
      prisma.userNotification.count({
        where: { userId: activeUser.activeUser.id },
      }),
      prisma.userNotification.findMany({
        where: { userId: activeUser.activeUser.id },
        include: { notification: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
    ]);

    return {
      data: response,
      paginationCount: paginationCount,
      unreadCount: unreadCount,
      error: { message: "" },
      isAdmin: activeUser.activeUser.email === process.env.USER_UBER_ADMIN,
    };
  } catch (error) {
    console.log("🚀 ~ getNotificationsAction ~ error:", error);
    return {
      data: [],
      paginationCount: 0,
      unreadCount: 0,
      isAdmin: false,
      error: { message: "Something went wrong" },
    };
  }
}
export async function getUnreadNotificationsAction(): Promise<{
  data: number;
  error: { message: string };
}> {
  const { data: activeUser } = await verifyCurrentActiveUser();
  try {
    if (!activeUser?.activeUser) {
      throw new Error("User not authorized");
    }

    const unreadCount = await prisma.userNotification.count({
      where: {
        userId: activeUser.activeUser.id,
        read: false,
      },
    });

    return {
      data: unreadCount,
      error: { message: "" },
    };
  } catch (error) {
    console.log("🚀 ~ getUnreadNotificationsAction ~ error:", error);
    return {
      data: 0,
      error: { message: "Something went wrong" },
    };
  }
}

type CreateNotificationProps = {
  title: string;
  message: string;
  messageRichText?: string;
};

export async function createNotificationAction({
  title,
  message,
  messageRichText,
}: CreateNotificationProps): Promise<{
  data: string | null;
  error: { message: string };
}> {
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    const allUserIds = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    if (!allUserIds.length) {
      throw new Error("No users found");
    }

    await prisma.notification.create({
      data: {
        message,
        title,
        messageRichText: messageRichText || `<p>${message}</p>`,
        authorId: activeUserData?.activeUser.id,
        users: {
          create: allUserIds.map(({ id }) => ({ userId: id })),
        },
      },
    });

    revalidatePath("/dashboard/notifications");

    return {
      data: "created",
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ createNotificationAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}
export async function markAllAsReadNotificationAction(): Promise<{
  data: string | null;
  error: { message: string };
}> {
  const { data: activeUserData } = await verifyCurrentActiveUser();
  try {
    if (!activeUserData?.activeUser) {
      throw new Error("User not authorized");
    }

    await prisma.userNotification.updateMany({
      where: {
        userId: activeUserData?.activeUser.id,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    revalidatePath("/dashboard/notifications");

    return {
      data: "created",
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ markAllAsReadNotificationAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}
