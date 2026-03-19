import toast from "react-hot-toast";
import { getOverviewStatsAction } from "@/app/actions/overview";
import { useAuth } from "@clerk/nextjs";
import { StatusOverview } from "../../../Shared-protected/Overview/StatusOverview";
import { PriorityBreakdown } from "../../../Shared-protected/Overview/PriorityBreakdown";
import { FinishedWorkOverview } from "../../../Shared-protected/Overview/FinishedWorkOverview/FinishedWorkOverview";
import { RecentActivity } from "../../../Shared-protected/Overview/RecentActivity";
import { useQuery } from "@tanstack/react-query";
import { useBoardId } from "@/hooks/useBoardId";
import { BoardStatsCard } from "../../../Shared-protected/Overview/BoardStatsCard";
import { TeamWorkload } from "../../../Shared-protected/Overview/TeamWorkLoad/TeamWorkload";
import { BoardStats } from "../../../Shared-protected/Overview/BoardStats";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

export function BoardOverview() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardOverview() {
    if (!boardId || !orgId) return;
    toast.loading("Loading Overview...", {
      id: QUERY_KEYS.pages.board.overview.boardOverview,
    });
    try {
      const response = await getOverviewStatsAction(orgId, boardId);

      return response?.data;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board Overview, please try again",
      );
    } finally {
      toast.dismiss(QUERY_KEYS.pages.board.overview.boardOverview);
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardOverview,
    queryKey: [QUERY_KEYS.pages.board.overview.boardOverview],
    staleTime: 1000, // TODO : change to 5 min.
    gcTime: 1000, // TODO : change to 5 min.
  });

  return (
    <div className="max-w-400 p-4 mx-auto flex flex-col gap-4">
      <BoardStats data={data} />

      <div className="md:grid md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] flex flex-col gap-2 w-full ">
        <BoardStatsCard>
          <StatusOverview data={data?.statusOverviewData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <TeamWorkload
            data={data?.teamWorkLoadData}
            allAssignedWork={data?.allAssignedWork || 0}
            totalTasks={data?.totalTasks || 0}
          />
        </BoardStatsCard>

        <BoardStatsCard>
          <PriorityBreakdown data={data?.priorityBreakdownData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <FinishedWorkOverview type="board" />
        </BoardStatsCard>
      </div>
      <BoardStatsCard>
        <RecentActivity />
      </BoardStatsCard>
    </div>
  );
}
