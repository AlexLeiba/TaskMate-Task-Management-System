import { auth, clerkClient } from "@clerk/nextjs/server";

export async function verifyOrganizationMember(
  currentOrgId: string | undefined | null,
): Promise<{
  data: { role: string; isMember: boolean } | null;
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

    // CURRENT ACTIVE MEMBER CLERK DATA
    const currentMemberRole = currentOrgMembers?.find((org) => {
      return (
        org?.publicUserData?.userId === userId &&
        org?.organization?.id === (currentOrgId || orgId)
      );
    });

    if (!foundMemberInCurrentOrg) {
      throw new Error("Not authorized for the current Organization");
    }

    return {
      data: {
        role: currentMemberRole
          ? currentMemberRole?.role?.replace("org:", "")
          : "member",
        isMember: foundMemberInCurrentOrg,
      },
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ verifyOrganizationMember ~ error:", error);
    return {
      data: null,
      error: {
        message: error.message || "Not authorized for the current Organization",
      },
    };
  }
}
