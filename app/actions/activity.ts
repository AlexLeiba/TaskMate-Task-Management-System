"use server";

import { prisma } from "@/lib/prisma";
import { ActivityType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function getActivitiesAction({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}): Promise<{
  data: ActivityType[];
  count: number;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    if (!orgId) {
      return {
        data: [],
        count: 0,
        error: { message: "Something went wrong" },
      };
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
