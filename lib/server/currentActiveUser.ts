import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { User } from "../generated/prisma/client";
import { verifyOrganizationMember } from "./verifyOrganizationMember";

export async function currentActiveUser(): Promise<{
  data: User | null;
  error: { message: string };
}> {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;

    if (!userEmail || !user) {
      throw new Error("User not authenticated");
    }

    // CHECK IS USER IS MEMBER OF CURRENT ORGANIZATION
    const isMember = await verifyOrganizationMember(userEmail);

    if (!isMember.data) {
      throw new Error(
        "The user is not authorized for the current Organization",
      );
    }

    // CHECK IF USER EXISTS IN DB
    let activeUser = await prisma.user.findFirst({
      where: { email: userEmail },
    });

    // IF USER NOT EXISTS IN DB CREATE ONE
    if (!activeUser) {
      activeUser = await prisma.user.create({
        data: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: userEmail,
          avatar: user?.imageUrl || "",
        },
      });
    }

    return {
      data: activeUser,
      error: { message: "" },
    };
  } catch (error) {
    console.log("🚀 ~ currentActiveUser ~ error:", error);

    throw error;
    //THE UTILITY FN WILL BE USED INSIDE TRYCATCH BLOCK AND ERRORS WILL BE HANDLED THERE
  }
}

export async function getActiveUser(): Promise<User | null> {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;
    return await prisma.user.findFirst({
      where: { email: userEmail },
    });
  } catch (error) {
    console.log("🚀 ~ getActiveUser ~ error:", error);
    return null;
  }
}
