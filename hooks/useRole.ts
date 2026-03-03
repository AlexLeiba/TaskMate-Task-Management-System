import { useOrganization } from "@clerk/nextjs";

export function useRole(): "admin" | "member" {
  const { membership } = useOrganization();

  const role = membership?.role;

  if (role) {
    return role?.replace("org:", "") as "admin" | "member";
  }

  return "member";
}
