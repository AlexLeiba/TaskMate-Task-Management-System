import { getListDataAction } from "@/app/actions/list";
import { ListDataTableType } from "@/lib/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

export function useBoardListData(
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

  const setBoardListData = useStore((state) => state.setBoardListData);

  async function fetchBoardFilteredListData() {
    toast.loading("loading...", { id: QUERY_KEYS.hooks.useBoardListData });
    try {
      if (!boardId) {
        throw new Error("Table data not found, please try again");
      }
      const listData = await getListDataAction({
        boardId,
        ...filters,
      });

      // UPDATE BOARD LIST STORE is used for Drag and Drop
      setBoardListData(listData.data?.data);

      return {
        data: listData.data?.data || null,
        role: listData.data?.role || null,
      };
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: QUERY_KEYS.hooks.useBoardListData,
      });
    } finally {
      toast.dismiss(QUERY_KEYS.hooks.useBoardListData);
    }
  }

  return useQuery({
    queryKey: [QUERY_KEYS.hooks.useBoardListData, boardId, filters],
    queryFn: fetchBoardFilteredListData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
}
