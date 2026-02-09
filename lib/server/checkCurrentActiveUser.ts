import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { User } from "../generated/prisma/client";
import { verifyOrganizationMember } from "./verifyOrganizationMember";
import { redirect } from "next/navigation";
import { getCurrentActiveUserData } from "./getCurrentActiveUserData";

export async function checkCurrentActiveUser(
  currentOrgId?: string | undefined | null,
): Promise<{
  data: User | null;
  error: { message: string };
}> {
  // GET CURRENT ACTIVE USER
  const { data, error } = await getCurrentActiveUserData();
  if (!data?.email || !data?.user) {
    redirect("/");
  }
  // CHECK USER MEMBER OF CURRENT ORGANIZATION
  const { data: isMember, error: memberError } =
    await verifyOrganizationMember(currentOrgId);

  if (!isMember || memberError?.message) {
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

    // IF USER NOT EXISTS IN DB CREATE ONE WITH DATA FROM CLERK
    if (!activeUser) {
      activeUser = await prisma.user.create({
        data: {
          name: `${data.user?.firstName} ${data.user?.lastName}`,
          email: data?.email,
          avatar: data?.user?.imageUrl || "",
        },
      });
    }

    return {
      data: activeUser,
      error: { message: "" },
    };
  } catch (error: any) {
    console.log("🚀 ~ currentActiveUser ~ error:", error);

    return {
      data: null,
      error: { message: error?.message || "Something went wrong" },
    };
    //ERRORS WILL BE CAUGHT BY USEQUERY AND USEMUTATION HOOKS
  }
}

type Props = {
  data: Pick<User, "email" | "name" | "avatar"> | null;
};
export async function createNewUser({ data }: Props): Promise<{
  data: User | null;
  error: { message: string };
}> {
  try {
    if (!data?.email) {
      throw new Error("User data not found");
    }

    // CHECK IF USER EXISTS IN DB
    let activeUser = await prisma.user.findFirst({
      where: { email: data?.email },
    });

    // IF USER NOT EXISTS IN DB CREATE ONE
    if (!activeUser) {
      activeUser = await prisma.user.create({
        data: {
          name: data?.name || "",
          email: data.email,
          avatar: data?.avatar || "",
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
    //ERRORS WILL BE CAUGHT BY USEQUERY AND USEMUTATION HOOKS
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
