"use server";

import { User } from "@/lib/generated/prisma/client";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { UserRoleType } from "@/lib/types";

export async function getUserAction(): Promise<{
  data: {
    activeUser: User | null;
    role: UserRoleType;
    stripeCustomerId?: string;
    isActiveSubscription?: boolean;
  } | null;
  error: { message: string };
}> {
  const { data: activeUser, error } = await verifyCurrentActiveUser();
  try {
    if (!activeUser?.activeUser || error?.message) {
      throw new Error("User not authorized");
    }
    return {
      data: activeUser,
      error: { message: "" },
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
