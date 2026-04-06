import { getListDataAction } from "@/app/actions/list";
import { FilterStates } from "@/lib/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useState } from "react";
import { PriorityType } from "@/lib/generated/prisma/client";

export function useGetBoardFilteredData(): {
  fetchBoardFilteredListData: (
    selectedMemberEmail: string,
    unassigned?: boolean,
    selectedFilter?: FilterStates,
    priorityType?: PriorityType,
  ) => void;
  loading?: boolean;
} {
  const boardId = useBoardId();
  const setBoardListData = useStore((state) => state.setBoardListData);
  const [loading, setLoading] = useState(false);

  async function fetchBoardFilteredListData(
    selectedMemberEmail: string = "",
    unassigned: boolean = false,
    selectedFilter: FilterStates = "all",
    priorityType: PriorityType | undefined = undefined,
  ) {
    toast.loading("loading...", { id: "useGetBoardFilteredData" });
    setLoading(true);
    try {
      const listData = await getListDataAction(
        boardId,
        priorityType,
        selectedMemberEmail,
        unassigned,
        selectedFilter,
      );

      // UPDATE BOARD LIST DATA
      setBoardListData(listData.data?.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss("useGetBoardFilteredData");
    }
  }

  return { fetchBoardFilteredListData, loading };
}
