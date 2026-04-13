import { getListDataTableViewAction } from "@/app/actions/list";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { ListDataTableType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useAuth } from "@clerk/nextjs";

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
  const { orgId } = useAuth();
  async function fetchTableData() {
    if (!boardId || !orgId) {
      throw new Error("Table data not found, please try again");
    }
    toast.loading("Loading...", {
      id: QUERY_KEYS.pages.board.tableListView.getAllTableData,
    });
    try {
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
      toast.dismiss(QUERY_KEYS.pages.board.tableListView.getAllTableData);
    }
  }
  return useQuery({
    queryFn: fetchTableData,
    queryKey: [
      QUERY_KEYS.pages.board.tableListView.getAllTableData,
      boardId,
      filters,
    ],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
