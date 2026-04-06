import { currentUser, User } from "@clerk/nextjs/server";

export async function getCurrentActiveUserData(): Promise<{
  data: {
    email: string | undefined;
    user: Pick<User, "fullName" | "imageUrl"> | null;
  } | null;
  error: { message: string | null };
}> {
  try {
    const user = await currentUser();

    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    return {
      data: {
        email: userEmail,
        user: {
          fullName: user?.fullName || user?.firstName || "User",
          imageUrl: user?.imageUrl || "",
        },
      },
      error: { message: null },
    };
  } catch (error: any) {
    console.log("🚀 ~ getCurrentActiveUserEmail ~ error:", error);
    return {
      data: null,
      error: { message: error.message || "User not authenticated" },
    };
  }
}
