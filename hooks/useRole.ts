import { useOrganization } from "@clerk/nextjs";

export function useRole() {
  const { membership } = useOrganization();

  const role = membership?.role;

  console.log(role); // "admin" | "basic_member"

  return role?.replace("org:", "") || "member";
}
