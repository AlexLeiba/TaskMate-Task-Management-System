import { prisma } from "../prisma";
import { User } from "../generated/prisma/client";
import { verifyOrganizationMember } from "./verifyOrganizationMember";
import { redirect } from "next/navigation";
import { getCurrentActiveUserData } from "./getCurrentActiveUserData";
import { UserRoleType } from "../types";

export async function verifyCurrentActiveUser(
  currentOrgId?: string | undefined | null,
): Promise<{
  data: { activeUser: User | null; role: UserRoleType } | null;
  error: { message: string };
}> {
  // GET CURRENT ACTIVE USER
  const { data, error } = await getCurrentActiveUserData();
  if (!data?.email || !data?.user) {
    redirect("/");
  }
  // CHECK IF USER IS MEMBER OF CURRENT ORGANIZATION
  const { data: memberData, error: memberError } =
    await verifyOrganizationMember(currentOrgId);

  if (!memberData?.isMember || memberError?.message) {
    redirect("/dashboard");
  }

  try {
    if (error?.message) {
      throw new Error(error?.message || "User not authenticated");
    }
    if (memberError?.message) {
      throw new Error(
        memberError?.message || "Not authorized for the current Organization",
      );
    }

    // CHECK IF USER EXISTS IN DB
    let activeUser = await prisma.user.findFirst({
      where: { email: data?.email },
    });

    // IF USER NOT EXISTS IN DB BUT IS AUTHENTICATED AND AUTHORIZED, CREATE ONE WITH DATA PROVIDED FROM CLERK AUTH
    if (!activeUser) {
      activeUser = await prisma.user.create({
        data: {
          name: `${data?.user?.fullName}` || "User",
          email: data?.email,
          avatar: data?.user?.imageUrl || "",
        },
      });
    }

    // IF USER HAS CHANGED NAME OR IMAGE
    if (
      activeUser?.avatar !== data?.user?.imageUrl ||
      activeUser?.name !== data?.user?.fullName
    ) {
      activeUser = await prisma.user.update({
        where: { id: activeUser?.id },
        data: {
          name: `${data?.user?.fullName}` || "User",
          email: data?.email,
          avatar: data?.user?.imageUrl || "",
        },
      });
    }

    return {
      data: { activeUser, role: memberData.role },
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ currentActiveUser ~ error:", error);

    return {
      data: null,
      error: { message: error?.message || "Something went wrong" },
    };
  }
}
