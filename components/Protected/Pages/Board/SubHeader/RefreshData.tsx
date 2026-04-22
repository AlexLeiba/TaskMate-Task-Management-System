import { IconButton } from "@/components/ui/iconButton";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useStore } from "@/store/useStore";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useShallow } from "zustand/shallow";

export function RefreshData() {
  const queryClient = useQueryClient();

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
  const isFetchingKanbanList =
    useIsFetching({
      queryKey: [QUERY_KEYS.hooks.useBoardListData],
      exact: true,
    }) > 0;
  // const isFetchingTable =
  //   useIsFetching({
  //     queryKey: [QUERY_KEYS.hooks.useTableData, boardId, filterState],
  //     exact: true,
  //   }) > 0;

  const isRefreshing = isFetchingBoardOverview || isFetchingKanbanList;

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

    // list table view
    if (boardTabSections === "list") {
      setFilterState({ filters: "all" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useTableData],
      });
    }

    // kanban board view
    if (boardTabSections === "board") {
      setFilterState({ filters: "all" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    }

    // invalidate members
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.hooks.useMembers],
    });
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
