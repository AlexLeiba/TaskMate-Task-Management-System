import toast from "react-hot-toast";
import { getSummaryStatsAction } from "@/app/actions/summary";
import { useAuth } from "@clerk/nextjs";
import { StatusOverview } from "./StatusOverview";
import { PriorityBreakdown } from "./PriorityBreakdown";
import { FinishedWorkOverview } from "./FinishedWorkOverview";
import { RecentActivity } from "./RecentActivity";
import { useQuery } from "@tanstack/react-query";
import { useBoardId } from "@/hooks/useBoardId";

import { BoardStatsCard } from "./BoardStatsCard";
import { TeamWorkload } from "./TeamWorkload";
import { BoardStats } from "./BoardStats";

export function Summary() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardSummary() {
    if (!boardId || !orgId) return;
    try {
      const response = await getSummaryStatsAction(orgId, boardId);

      return response?.data;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board summary, please try again",
      );
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardSummary,
    queryKey: ["boardSummary"],
  });

  return (
    <div className="max-w-400 p-4 mx-auto flex flex-col gap-4">
      <BoardStats data={data} />

      <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] grid-cols-1 gap-2 w-full">
        <BoardStatsCard>
          <StatusOverview data={data?.statusOverviewData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <FinishedWorkOverview />
        </BoardStatsCard>
        <BoardStatsCard>
          <PriorityBreakdown data={data?.priorityBreakdownData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <TeamWorkload
            data={data?.teamWorkLoadData}
            allAssignedWork={data?.allAssignedWork || 0}
          />
        </BoardStatsCard>
      </div>
      <BoardStatsCard>
        <RecentActivity />
      </BoardStatsCard>
    </div>
  );
}
