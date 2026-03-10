import { PriorityBreakdownType } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type Props = {
  data: PriorityBreakdownType[] | undefined;
};
export function PriorityBreakdown({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium">Priority breakdown</h5>
        <p>Get an overview of how work is being prioritized.</p>
        <p>The overview is calculated by only unfished work.</p>
      </div>
      <div className="grid lg:grid-cols-[2fr,1fr] grid-cols-[repeat(auto-fit,minmax(600px,1fr))]  overflow-x-auto">
        <BarChart
          className="w-full max-h-75"
          style={{ aspectRatio: 1 }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey={"name"} className="text-white" stroke="white" />
          <YAxis width="auto" dataKey={"value"} />
          <Tooltip wrapperClassName="rounded-md bg-gray-200 text-gray-800" />

          <Bar
            width={2}
            barSize={40}
            dataKey="value"
            fill="oklch(35.162% 0.18383 255.011)"
            activeBar={{
              fill: "oklch(65.162% 0.18383 255.011)",
              stroke: "text-gray-800",
            }}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </div>
    </div>
  );
}
