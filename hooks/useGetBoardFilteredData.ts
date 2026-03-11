import { getListDataAction } from "@/app/actions/list";
import { FilterStates } from "@/lib/types";
import { useStore } from "@/store/useStore";
import toast from "react-hot-toast";
import { useBoardId } from "./useBoardId";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export function useGetBoardFilteredData(): {
  fetchBoardFilteredListData: (
    selectedMemberEmail: string,
    unassigned?: boolean,
    selectedFilter?: FilterStates,
  ) => void;
  loading?: boolean;
} {
  const boardId = useBoardId();
  const { orgId } = useAuth();
  const { setBoardListData } = useStore();
  const [loading, setLoading] = useState(false);

  async function fetchBoardFilteredListData(
    selectedMemberEmail: string = "",
    unassigned: boolean = false,
    selectedFilter: FilterStates = "all",
  ) {
    toast.loading("loading...", { id: "useGetBoardFilteredData" });
    setLoading(true);
    try {
      const listData = await getListDataAction(
        boardId,
        orgId,
        selectedMemberEmail,
        unassigned,
        selectedFilter,
      );

      // UPDATE BOARD LIST DATA
      setBoardListData(listData.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss("useGetBoardFilteredData");
    }
  }

  return { fetchBoardFilteredListData, loading };
}
