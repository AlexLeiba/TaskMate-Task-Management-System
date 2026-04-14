import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useStore } from "@/store/useStore";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useShallow } from "zustand/shallow";

export function RefreshData() {
  const queryClient = useQueryClient();

  const { fetchBoardFilteredListData, loading } = useGetBoardData();

  // const { boardTabSections } = useStore((state) => state);
  const { setBoardTabSections, boardTabSections, setFilterState } = useStore(
    useShallow((state) => ({
      setBoardTabSections: state.setBoardTabSections,
      boardTabSections: state.boardTabSections,
      setFilterState: state.setFilterState,
    })),
  );

  const isFetchingBoardOverview =
    useIsFetching({
      queryKey: [QUERY_KEYS.pages.board.overview.boardOverview],
    }) > 0;

  const isRefreshing = isFetchingBoardOverview || loading;

  function handleRefreshData() {
    setBoardTabSections("refresh");
    if (boardTabSections === "overview") {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.pages.board.overview.boardOverview],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.pages.board.overview.finishedWork],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.pages.board.overview.recentActivities],
      });
      return;
    }
    if (boardTabSections === "list") {
      setFilterState({ filters: "all" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.pages.board.tableListView.getAllTableData],
      });
    }
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.hooks.useMembers],
    });
    fetchBoardFilteredListData({ filters: "all" });
  }
  return (
    <IconButton
      disabled={isRefreshing}
      loading={isRefreshing}
      onClick={handleRefreshData}
      title="Refresh data"
      aria-label="Refresh data"
      className="p-2 hidden md:block"
    >
      <RefreshCcw size={24} />
    </IconButton>
  );
}
