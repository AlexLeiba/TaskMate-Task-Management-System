"use client";
import { finishedWorkOverviewAction } from "@/app/actions/overview";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { useBoardId } from "@/hooks/useBoardId";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Pie, PieChart, Tooltip } from "recharts";
import { LegendValue } from "../LegendValue";
import { LegendColor } from "../LegendColor";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { Award } from "lucide-react";
import { FilterTabs } from "./FilterTabs";
import { FinishedWorkFilterTabs } from "@/lib/types";
import { SkeletonMembers } from "./SkeletonMembers";
import { useUser } from "@clerk/nextjs";

type Props = {
  type?: "board" | "organization";
  orgId: string;
};
export function FinishedWorkOverview({ type, orgId }: Props) {
  const boardId = useBoardId();
  const { isLoaded, user } = useUser();

  async function fetchBoardFinishedWorkStats() {
    try {
      // board
      if (type === "board") {
        if (!boardId) {
          throw new Error("Board not found");
        }

        const response = await finishedWorkOverviewAction(orgId, boardId);

        return response?.data || [];
      }

      // dashboard
      const response = await finishedWorkOverviewAction(orgId, null);

      return response?.data || { data: [] };
    } catch (error: any) {
      toast.error(
        error.message || "Error on Finished work overview, please try again",
      );
      console.log("🚀 ~ fetchBoardFinishedWorkStats ~ error:", error);

      return [];
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardFinishedWorkStats,
    queryKey: [QUERY_KEYS.pages.board.overview.finishedWork, orgId],
    staleTime: 1000, // TODO : change to 5 min.
    gcTime: 1000, // TODO : change to 5 min.
    refetchOnMount: true,
    enabled: isLoaded && !!user && !!orgId,
  });

  const {
    data: filteredData,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: async (selectedTab: FinishedWorkFilterTabs) => {
      if (!orgId) {
        throw new Error("User not authenticated");
      }
      toast.loading("Loading finished work overview...", {
        id: QUERY_KEYS.pages.board.overview.finishedWork,
      });
      const response = await finishedWorkOverviewAction(
        orgId,
        type === "board" ? boardId : null,
        selectedTab,
      );

      return response?.data || [];
    },
    mutationKey: [QUERY_KEYS.pages.board.overview.finishedWork, orgId],
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.overview.finishedWork);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong, please try again");
      toast.dismiss(QUERY_KEYS.pages.board.overview.finishedWork);
    },
  });

  const finishedWorkData = filteredData || data;

  return (
    <div className="flex flex-col gap-2" data-test="finished-work-overview">
      <div>
        <h5 className="text-2xl font-medium">
          Finished work overview
          <span className="text-lg text-tertiary"> of {type}</span>
        </h5>
        <p className="text-wrap">
          Get an overview of the finished work by each team member for a certain
          period of time.
        </p>
        <p className="text-primary/70">
          Filter by last number of days. By default is displayed all time
          finished work.
        </p>
      </div>
      <FilterTabs handleFilterTab={(selectedTab) => mutate(selectedTab)} />

      <div className="grid lg:grid-cols-[2fr_1fr] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2">
        <PieChart
          className="w-full max-w-full max-h-75"
          style={{ aspectRatio: 1 }}
          responsive
          margin={{
            top: 50,
            right: 100,
            bottom: 20,
            left: 30,
          }}
        >
          <Pie
            data={finishedWorkData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
            className="hover:opacity-90"
            label={(props) => `${props.name}`}
            nameKey={"fullName"}
          />
          <Tooltip
            // defaultIndex={0}
            wrapperClassName="rounded-md bg-gray-200 "
          />
        </PieChart>

        <div className="flex flex-col gap-2 justify-center md:w-70">
          {isPending && <SkeletonMembers />}
          {!isPending && finishedWorkData && finishedWorkData.length > 0
            ? finishedWorkData
                .slice()
                .sort((a, b) => b.value - a.value)
                .map((item, index) => {
                  return (
                    <div
                      key={item.email}
                      className="flex items-center gap-3 relative"
                    >
                      <LegendColor color={item.fill} />
                      <UserCard
                        size="md"
                        data={{
                          email: item.email,
                          name: item.fullName,
                          avatar: item.imageUrl,
                        }}
                      />

                      {index === 0 && (
                        <Award className="absolute left-13 bottom-0" />
                      )}
                      <LegendValue>{item.value}</LegendValue>
                    </div>
                  );
                })
            : !isPending && <p>No data was found.</p>}
        </div>
      </div>
    </div>
  );
}
