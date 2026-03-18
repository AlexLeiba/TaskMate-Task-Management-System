"use server";

import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { ActivityWithAuthor } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function getActivitiesAction({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}): Promise<{
  data: ActivityWithAuthor[];
  count: number;
  error: { message: string };
}> {
  const { data: activeUser } = await verifyCurrentActiveUser();
  try {
    const { orgId } = await auth();
    if (!orgId || !activeUser?.activeUser) {
      throw new Error("User not authenticated");
    }

    const [count, response] = await Promise.all([
      prisma.activity.count({ where: { orgId } }),
      prisma.activity.findMany({
        where: { orgId },
        include: { author: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
    ]);

    return { data: response, count, error: { message: "" } };
  } catch (error) {
    console.log("🚀 ~ getActivitiesAction ~ error:", error);
    return {
      data: [],
      count: 0,
      error: { message: "Something went wrong" },
    };
  }
}
