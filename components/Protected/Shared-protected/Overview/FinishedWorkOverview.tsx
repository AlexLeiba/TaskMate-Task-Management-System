import { finishedWorkOverviewAction } from "@/app/actions/overview";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { useBoardId } from "@/hooks/useBoardId";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Pie, PieChart, Tooltip } from "recharts";
import { LegendValue } from "./LegendValue";
import { LegendColor } from "./LegendColor";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

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
      if (type === "board") {
        const response = await finishedWorkOverviewAction(orgId, boardId);

        return response;
      }
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
    queryKey: [QUERY_KEYS.pages.board.overview.finishedWork, orgId, boardId],
    staleTime: 1000, // TODO : change to 5 min.
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium">Finished work overview</h5>
        <p className="text-wrap">
          Get an overview of the finished work by team member for all time on
          this board.
        </p>
        <p>Filter finished work by time period.</p>
      </div>

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
            data={data?.data}
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

        <div className="flex flex-col gap-2 justify-center">
          {data?.data?.map((item) => {
            return (
              <div key={item.email} className="flex items-center gap-3">
                <LegendColor color={item.fill} />
                <UserCard
                  size="sm"
                  data={{
                    email: item.email,
                    name: item.fullName,
                    avatar: item.imageUrl,
                  }}
                />
                <LegendValue>{item.value}</LegendValue>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
