"use client";

import { SummaryStatsType } from "@/lib/types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BoardStats } from "../../Shared-protected/Summary/BoardStats";
import { BoardStatsCard } from "../../Shared-protected/Summary/BoardStatsCard";
import { StatusOverview } from "../../Shared-protected/Summary/StatusOverview";
import { FinishedWorkOverview } from "../../Shared-protected/Summary/FinishedWorkOverview";
import { PriorityBreakdown } from "../../Shared-protected/Summary/PriorityBreakdown";
import { TeamWorkload } from "../../Shared-protected/Summary/TeamWorkLoad/TeamWorkload";
import { RecentActivity } from "../../Shared-protected/Summary/RecentActivity";

type Props = {
  data: {
    data: SummaryStatsType | null;
    error: {
      message: string;
    } | null;
  };
};
export function OrgSummary({ data: { data, error } }: Props) {
  useEffect(() => {
    if (error?.message) toast.error(error?.message);
  }, [error?.message]);
  return (
    <div className="flex flex-col gap-4">
      <BoardStats data={data} />

      <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] grid-cols-1 gap-2 w-full">
        <BoardStatsCard>
          <StatusOverview data={data?.statusOverviewData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <FinishedWorkOverview type="dashboard" />
        </BoardStatsCard>
        <BoardStatsCard>
          <PriorityBreakdown data={data?.priorityBreakdownData} />
        </BoardStatsCard>
        <BoardStatsCard>
          <TeamWorkload
            data={data?.teamWorkLoadData}
            allAssignedWork={data?.allAssignedWork || 0}
            totalTasks={data?.totalTasks || 0}
          />
        </BoardStatsCard>
      </div>
    </div>
  );
}
