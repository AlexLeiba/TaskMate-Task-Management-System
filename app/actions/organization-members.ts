"use server";

import { OrganizationMembersType } from "@/lib/types";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganizationMembersAction() {
  try {
    const { orgId } = await auth();
    const client = await clerkClient();

    const { data } = await client.organizations.getOrganizationMembershipList({
      organizationId: orgId!,
      limit: 100,
    });

    const members: OrganizationMembersType[] = data.map((member) => {
      return {
        fullName:
          member.publicUserData?.firstName +
            " " +
            member.publicUserData?.lastName || "Member",
        email: member.publicUserData?.identifier || "none",
        imageUrl: member.publicUserData?.imageUrl || "",
        userId: member.publicUserData?.userId || "none",
      };
    });

    return {
      data: {
        members,
      },
    };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
