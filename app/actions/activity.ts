"use server";

import { Activity, User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";
import { auth } from "@clerk/nextjs/server";

export type ActivityWithAuthor = Activity & { author: User };
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
  try {
    const { data: activeUser } = await checkCurrentActiveUser();
    const { orgId } = await auth();
    if (!orgId || !activeUser) {
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
