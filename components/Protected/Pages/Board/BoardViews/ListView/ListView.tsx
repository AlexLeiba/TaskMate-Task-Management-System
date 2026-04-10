import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useBoardId } from "@/hooks/useBoardId";

import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { getListDataTableViewAction } from "@/app/actions/list";
import { COLUMNS } from "./Columns";
import { DataTable } from "./DataTable";

export function ListView() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardOverview() {
    if (!boardId || !orgId) return;

    try {
      const response = await getListDataTableViewAction(boardId);
      console.log("🚀 ~ fetchBoardOverview ~ response:", response);

      return response?.data || null;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board data, please try again",
      );

      return null;
    }
  }

  const { data: boardData } = useQuery({
    queryFn: fetchBoardOverview,
    queryKey: [QUERY_KEYS.pages.board.listView.getAllBoardData],
    staleTime: 1000, // TODO : change to 5 min.
    gcTime: 1000, // TODO : change to 5 min.
    refetchOnMount: true,
  });

  return (
    <div className="overflow-y-hidden h-[calc(100vh-108px)] p-4 max-w-400 mx-auto  overflow-x-auto relative">
      {boardData?.data?.cards && COLUMNS ? (
        <DataTable
          columns={COLUMNS}
          data={boardData.data.cards}
          listStatuses={boardData?.data?.listStatuses}
        />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
