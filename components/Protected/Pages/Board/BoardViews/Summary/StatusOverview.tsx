import { StatusOverviewType } from "@/lib/types";
import { Pie, PieChart, Tooltip } from "recharts";
import { LegendValue } from "./LegendValue";
import { LegendColor } from "./LegendColor";

type Props = {
  data: StatusOverviewType[] | undefined;
};
export function StatusOverview({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium">Status overview</h5>
        <p className="text-wrap">
          Get a snapshot of the status of your work items. View all work items
          grouped by status
        </p>
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
            left: 40,
          }}
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            className="hover:opacity-90"
            label={(data) => `${data.name}: ${data.value || 0}`}
          />
          <Tooltip
            // defaultIndex={0}
            wrapperClassName="rounded-md bg-gray-200 "
          />
        </PieChart>
        <div className="flex flex-col gap-2 justify-center">
          {data?.map((item) => {
            return (
              <div key={item.name} className="flex items-center gap-3">
                <LegendColor color={item.fill} />

                <p>{item.name}</p>
                <LegendValue>{item.value}</LegendValue>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
