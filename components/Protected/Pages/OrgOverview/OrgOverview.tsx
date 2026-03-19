"use client";

import { OverviewStatsType } from "@/lib/types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BoardStats } from "../../Shared-protected/Overview/BoardStats";
import { BoardStatsCard } from "../../Shared-protected/Overview/BoardStatsCard";
import { StatusOverview } from "../../Shared-protected/Overview/StatusOverview";
import { FinishedWorkOverview } from "../../Shared-protected/Overview/FinishedWorkOverview/FinishedWorkOverview";
import { PriorityBreakdown } from "../../Shared-protected/Overview/PriorityBreakdown";
import { TeamWorkload } from "../../Shared-protected/Overview/TeamWorkLoad/TeamWorkload";

type Props = {
  data: {
    data: OverviewStatsType | null;
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

      <div className="md:grid md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] flex flex-col gap-2 w-full">
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
