import { getListDataTableViewAction } from "@/app/actions/list";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { ListDataTableType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";

export function useTableData(
  filters?:
    | Pick<
        ListDataTableType,
        | "priorityType"
        | "selectedMemberEmail"
        | "unassignedCard"
        | "filters"
        | "search"
      >
    | undefined,
) {
  const boardId = useBoardId();
  async function fetchTableData() {
    toast.loading("Loading...", {
      id: QUERY_KEYS.hooks.useTableData,
    });
    try {
      if (!boardId) {
        throw new Error("Table data not found, please try again");
      }
      const response = await getListDataTableViewAction({
        boardId,
        ...filters,
      });

      return response?.data || null;
    } catch (error: any) {
      toast.error(
        error.message || "Error on getting table data, please try again",
      );

      return null;
    } finally {
      toast.dismiss(QUERY_KEYS.hooks.useTableData);
    }
  }
  const { data, isLoading } = useQuery({
    queryFn: fetchTableData,
    queryKey: [
      QUERY_KEYS.hooks.useTableData,
      boardId,
      filters?.filters,
      filters?.search,
      filters?.unassignedCard,
      filters?.selectedMemberEmail,
      filters?.priorityType,
    ],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });

  return { data, isLoading };
}
