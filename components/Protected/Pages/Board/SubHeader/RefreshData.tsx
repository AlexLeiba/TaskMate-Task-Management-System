import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useStore } from "@/store/useStore";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export function RefreshData() {
  const { boardTabSections } = useStore((state) => state);

  const { fetchBoardFilteredListData, loading } = useGetBoardFilteredData();
  const setBoardTabSections = useStore((state) => state.setBoardTabSections);
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.hooks.useMembers],
    });
    fetchBoardFilteredListData("");
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
