import { auth, clerkClient } from "@clerk/nextjs/server";

export async function verifyOrganizationMember(memberEmail: string): Promise<{
  data: boolean;
  error: { message: string };
}> {
  try {
    const { orgId } = await auth();
    if (!orgId)
      return { data: false, error: { message: "User not authenticated" } };

    const { data: currentOrgMembers } = await (
      await clerkClient()
    ).users.getUserList();

    const foundMemberInCurrentOrg = currentOrgMembers.find(
      (user) => user.emailAddresses[0].emailAddress === memberEmail,
    );
    if (!foundMemberInCurrentOrg) {
      return {
        data: false,
        error: { message: "User not authorized for the current Organization" },
      };
    }

    return {
      data: true,
      error: { message: "" },
    };
  } catch (error) {
    console.log("🚀 ~ getOrgMembers ~ error:", error);
    return { data: false, error: { message: "Something went wrong" } };
  }
}
