import { auth, clerkClient } from "@clerk/nextjs/server";

export async function verifyOrganizationMember(
  currentOrgId: string | undefined | null,
): Promise<{
  data: boolean;
  error: { message: string };
}> {
  try {
    const { orgId, userId } = await auth();

    if (!userId || !orgId) {
      throw new Error("User not authenticated");
    }

    const { data: currentOrgMembers } = await (
      await clerkClient()
    )?.users?.getOrganizationMembershipList({
      userId,
    });

    const foundMemberInCurrentOrg = currentOrgMembers?.some(
      (org) => org?.organization?.id === (currentOrgId || orgId),
    );

    if (!foundMemberInCurrentOrg) {
      throw new Error("Not authorized for the current Organization");
    }

    return {
      data: true,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ verifyOrganizationMember ~ error:", error);
    return {
      data: false,
      error: {
        message: error.message || "Not authorized for the current Organization",
      },
    };
  }
}
