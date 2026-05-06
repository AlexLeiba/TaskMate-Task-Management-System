import { getUserAction } from "@/app/actions/user";
import { User } from "@/lib/generated/prisma/client";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { UserRoleType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

export function useSession(): {
  data:
    | {
        activeUser: User | null;
        role: UserRoleType;
        stripeCustomerId?: string;
        isActiveSubscription?: boolean;
        planName?: string;
      }
    | null
    | undefined;
  isFetching: boolean;
} {
  async function fetchSessionDaa() {
    try {
      const { data, error } = await getUserAction();

      if (error?.message) {
        throw new Error(error?.message);
      }

      return data;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.hooks.useSession],
    queryFn: fetchSessionDaa,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return { data, isFetching: isFetching && !isLoading };
}
