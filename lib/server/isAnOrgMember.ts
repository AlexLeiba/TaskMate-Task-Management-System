import { auth, clerkClient } from "@clerk/nextjs/server";

export async function isOrgMember(currentOrgId?: string | undefined | null) {
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

    return { data: foundMemberInCurrentOrg, error: null };
  } catch (error: any) {
    return {
      data: false,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
