import { getListDataAction } from "@/app/actions/list";
import { ListDataKanbanType } from "@/lib/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useState } from "react";

export function useGetBoardData(): {
  fetchBoardFilteredListData: (data: ListDataKanbanType) => void;
  loading?: boolean;
} {
  const boardId = useBoardId();
  const setBoardListData = useStore((state) => state.setBoardListData);
  const [loading, setLoading] = useState(false);

  async function fetchBoardFilteredListData({
    selectedMemberEmail,
    unassignedCard,
    filters,
    priorityType,
  }: ListDataKanbanType) {
    toast.loading("loading...", { id: "useGetBoardData" });
    setLoading(true);
    try {
      const listData = await getListDataAction({
        boardId,
        priorityType,
        selectedMemberEmail,
        unassignedCard,
        filters,
      });

      // UPDATE BOARD LIST DATA
      setBoardListData(listData.data?.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss("useGetBoardData");
    }
  }

  return { fetchBoardFilteredListData, loading };
}
