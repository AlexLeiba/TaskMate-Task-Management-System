"use server";

import { checkCurrentActiveUser } from "@/lib/server/checkCurrentActiveUser";

export async function getUserRoleAction(orgId: string): Promise<{
  role: "admin" | "member" | undefined;
}> {
  const activeUser = await checkCurrentActiveUser(orgId);
  try {
    if (!activeUser || activeUser.error?.message) {
      throw new Error("User not authorized");
    }

    return { role: activeUser?.data?.role };
  } catch (error: any) {
    console.log("🚀 ~ getUserRoleAction ~ error:", error);
    throw error?.message || "Something went wrong";
  }
}
