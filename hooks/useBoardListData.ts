import { getListDataAction } from "@/app/actions/list";
import { ListDataTableType } from "@/lib/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useShallow } from "zustand/shallow";

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

  const { setBoardListData, setUnfilteredBoardListData } = useStore(
    useShallow((state) => ({
      setBoardListData: state.setBoardListData,
      setUnfilteredBoardListData: state.setUnfilteredBoardListData,
    })),
  );

  async function fetchBoardFilteredListData() {
    toast.loading("loading...", { id: QUERY_KEYS.hooks.useBoardListData });
    try {
      if (!boardId) {
        throw new Error("Table data not found, please try again");
      }
      const { data } = await getListDataAction({
        boardId,
        ...filters,
      });

      // INITIALIZE BOARD LIST DATA GLOBAL STORE used for optimistic Drag and Drop
      setBoardListData(data?.data);

      // INITIALIZE UNFILTERED BOARD LIST DATA GLOBAL STORE used for diplaying independent data of active filters
      setUnfilteredBoardListData(data?.unfilteredData);

      return {
        data: data?.data || null,
        role: data?.role || null,
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
