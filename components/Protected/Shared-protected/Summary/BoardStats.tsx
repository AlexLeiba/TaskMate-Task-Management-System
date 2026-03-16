import { SummaryStatsType } from "@/lib/types";

import {
  Calendar1,
  CircleCheck,
  FilePlus,
  Ticket,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { BoardStatsCard } from "./BoardStatsCard";

type Props = {
  data: SummaryStatsType | null | undefined;
};
export function BoardStats({ data }: Props) {
  const stats = [
    {
      id: 1,
      icon: <CircleCheck className="text-green-400" />,
      title: "completed",
      value: data?.completed,
      description: "done card tickets in the last 7 days",
    },

    {
      id: 3,
      icon: <FilePlus className="text-yellow-200" />,
      title: "created",
      value: data?.createdInAWeek,
      description: "created tickets in the last 7 days",
    },
    {
      id: 4,
      icon: <Calendar1 className="text-tertiary" />,
      title: "due soon",
      value: data?.dueDateInAWeek,
      description: "due date in the next 7 days",
    },
    {
      id: 5,
      icon: <Ticket className="text-yellow-400" />,
      title: "total tasks",
      value: data?.totalTasks,
      description: "active task tickets",
    },
    {
      id: 6,
      icon: <UserPlus className="text-green-400" />,
      title: "total assigned",
      value: data?.allAssignedWork,
      description: "active assigned task tickets",
    },
    {
      id: 7,
      icon: <UserMinus className="text-orange-400" />,
      title: "total unassigned",
      value: Number(data?.totalTasks || 0) - Number(data?.allAssignedWork || 0),
      description: "unassigned task tickets",
    },
  ];

  return (
    <div className="grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {stats.map((stat) => {
        return (
          <BoardStatsCard key={stat.id}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-md">{stat?.icon}</div>
              <div className="flex flex-col ">
                <p className="text-xl">
                  {stat?.value} {stat?.title}
                </p>
                <p className="text-sm text-primary/80">{stat?.description}</p>
              </div>
            </div>
          </BoardStatsCard>
        );
      })}
    </div>
  );
}
