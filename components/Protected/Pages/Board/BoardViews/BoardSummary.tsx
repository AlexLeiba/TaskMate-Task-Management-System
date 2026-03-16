import toast from "react-hot-toast";
import { getSummaryStatsAction } from "@/app/actions/summary";
import { useAuth } from "@clerk/nextjs";
import { StatusOverview } from "../../../Shared-protected/Summary/StatusOverview";
import { PriorityBreakdown } from "../../../Shared-protected/Summary/PriorityBreakdown";
import { FinishedWorkOverview } from "../../../Shared-protected/Summary/FinishedWorkOverview";
import { RecentActivity } from "../../../Shared-protected/Summary/RecentActivity";
import { useQuery } from "@tanstack/react-query";
import { useBoardId } from "@/hooks/useBoardId";
import { BoardStatsCard } from "../../../Shared-protected/Summary/BoardStatsCard";
import { TeamWorkload } from "../../../Shared-protected/Summary/TeamWorkLoad/TeamWorkload";
import { BoardStats } from "../../../Shared-protected/Summary/BoardStats";

export function BoardSummary() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardSummary() {
    if (!boardId || !orgId) return;
    toast.loading("Loading board summary...", { id: "boardSummary" });
    try {
      const response = await getSummaryStatsAction(orgId, boardId);

      return response?.data;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board summary, please try again",
      );
    } finally {
      toast.dismiss("boardSummary");
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardSummary,
    queryKey: ["boardSummary"],
    staleTime: 1000, // TODO : change to 5 min.
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
