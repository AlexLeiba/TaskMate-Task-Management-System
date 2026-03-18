import { getOrganizationMembersAction } from "@/app/actions/organization-members";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { OrganizationMembersType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

export function useMembers(): {
  members: OrganizationMembersType[] | undefined;
  isFetching: boolean;
} {
  async function fetchOrganizationMembers() {
    try {
      const { data } = await getOrganizationMembersAction();

      return data?.members;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const {
    data: members,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.hooks.useMembers],
    queryFn: fetchOrganizationMembers,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5,
  });

  return { members, isFetching: isFetching && !isLoading };
}
