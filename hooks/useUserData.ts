import { useUser } from "@clerk/nextjs";

export function useUserData() {
  const user = useUser();

  if (!user) {
    return { name: "Member", email: "", image: "" };
  }

  return {
    name: user?.user?.fullName || "Member",
    email: user?.user?.emailAddresses[0].emailAddress || "",
    image: user?.user?.imageUrl || "",
  };
}
