import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { User } from "../generated/prisma/client";

export async function currentActiveUser(userData: {
  email: string;
  name: string;
  imageUrl: string;
}) {
  let activeUser = await prisma.user.findFirst({
    where: { email: userData.email },
  });

  if (!activeUser) {
    activeUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        avatar: userData.imageUrl,
      },
    });
  }

  return activeUser;
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
