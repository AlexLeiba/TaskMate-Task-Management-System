import { getOrganizationMembersAction } from "@/app/actions/organization-members";
import { OrganizationMembersType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

export function useMembers(): {
  members: OrganizationMembersType[] | undefined;
  isFetching: boolean;
} {
  async function fetchOrhanizationMembers() {
    try {
      const { data } = await getOrganizationMembersAction();

      return data?.members;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const { data: members, isFetching } = useQuery({
    queryKey: ["organization-members"],
    queryFn: fetchOrhanizationMembers,
  });

  return { members, isFetching };
}
