import { finishedWorkOverviewAction } from "@/app/actions/overview";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { useBoardId } from "@/hooks/useBoardId";
import { useAuth } from "@clerk/nextjs";
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

type Props = {
  type?: "board" | "dashboard";
};
export function FinishedWorkOverview({ type }: Props) {
  // TODO create a filter by days 7/14/30 /60/all time
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardFinishedWorkStats() {
    if (!orgId) return;
    if (type === "board" && !boardId) return;

    try {
      // board
      if (type === "board") {
        const response = await finishedWorkOverviewAction(orgId, boardId);

        return response;
      }

      // dashboard
      toast.loading("Loading finished work overview...", {
        id: QUERY_KEYS.pages.board.overview.finishedWork,
      });
      const response = await finishedWorkOverviewAction(orgId, null);

      return response || { data: [] };
    } catch (error: any) {
      toast.error(
        error.message || "Error on Finished work overview, please try again",
      );
    } finally {
      toast.dismiss(QUERY_KEYS.pages.board.overview.finishedWork);
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardFinishedWorkStats,
    queryKey: [QUERY_KEYS.pages.board.overview.finishedWork],
    staleTime: 1000, // TODO : change to 5 min.
  });

  const {
    data: filteredData,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: async (selectedTab: FinishedWorkFilterTabs) => {
      if (!orgId || !boardId) return;
      toast.loading("Loading finished work overview...", {
        id: QUERY_KEYS.pages.board.overview.finishedWork,
      });
      const response = await finishedWorkOverviewAction(
        orgId,
        type === "board" ? boardId : null,
        selectedTab,
      );

      return response;
    },
    mutationKey: [QUERY_KEYS.pages.board.overview.finishedWork],
    onSuccess: (data) => {
      console.log(data);
      toast.dismiss(QUERY_KEYS.pages.board.overview.finishedWork);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong, please try again");
      toast.dismiss(QUERY_KEYS.pages.board.overview.finishedWork);
    },
  });

  const finishedWorkData = filteredData?.data || data?.data;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium">Finished work overview</h5>
        <p className="text-wrap">
          Get an overview of the finished work by team member for all time on
          this board.
        </p>
        <p className="text-lg">
          Filter finished work by members over a certain nr of days.
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
                ?.sort((a, b) => b.value - a.value)
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
