import { finishedWorkOverviewAction } from "@/app/actions/summary";
import { UserCard } from "@/components/layout/Protected/UserCard/UserCard";
import { useBoardId } from "@/hooks/useBoardId";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Pie, PieChart, Tooltip } from "recharts";
import { LegendValue } from "./LegendValue";
import { LegendColor } from "./LegendColor";

export function FinishedWorkOverview() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardFinishedWorkStats() {
    if (!boardId || !orgId) return;
    try {
      const response = await finishedWorkOverviewAction(
        orgId,
        "b5b20ba4-6d38-471c-95c6-c93887f4efc8",
      );

      return response;
    } catch (error: any) {
      toast.error(
        error.message || "Error on Finished work overview, please try again",
      );
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardFinishedWorkStats,
    queryKey: ["finishedWorkOverview"],
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium">Finished work overview</h5>
        <p className="text-wrap">
          Get an overview of the finished work by team member.
        </p>
        <p>View all work items grouped by done status of a card ticket.</p>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-2">
        <PieChart
          className="w-full max-w-full max-h-75"
          style={{ aspectRatio: 1 }}
          responsive
          margin={{
            top: 50,
            right: 100,
            bottom: 20,
            left: 20,
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
          {data?.data.map((item) => {
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
