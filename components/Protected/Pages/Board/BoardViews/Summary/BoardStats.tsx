import { SummaryStatsType } from "@/lib/types";

import { Calendar1, CircleCheck, FolderCheck } from "lucide-react";
import { BoardStatsCard } from "./BoardStatsCard";

type Props = {
  data: SummaryStatsType | undefined;
};
export function BoardStats({ data }: Props) {
  const stats = [
    {
      id: 1,
      icon: <CircleCheck className="text-green-400" />,
      title: "completed",
      value: data?.completed,
    },
    // {
    //   id: 2,
    //   icon: <Edit2 />,
    //   title: "updated",
    //   value: data?.updatedInAWeek,
    // },
    {
      id: 3,
      icon: <FolderCheck className="text-yellow-400" />,
      title: "created",
      value: data?.createdInAWeek,
    },
    {
      id: 4,
      icon: <Calendar1 className="text-tertiary" />,
      title: "due soon",
      value: data?.dueDateInAWeek,
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {stats.map((stat) => {
        return (
          <BoardStatsCard key={stat.id}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-md">{stat?.icon}</div>
              <div className="flex flex-col ">
                <p className="text-xl">
                  {stat?.value} {stat?.title}
                </p>
                <p className="text-sm text-primary/80">
                  {stat.id !== 4 ? "In the last 7 days" : "In the next 7 days"}
                </p>
              </div>
            </div>
          </BoardStatsCard>
        );
      })}
    </div>
  );
}
