import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TeamWorkloadType } from "@/lib/types";
import { TeamWorkloadDistributionCard } from "./TeamWorkloadDistributionCard";
import { TeamWorkloadDistributionCardTooltipContent } from "./TeamWorkloadDistributionCardTooltipContent";
import { TeamWorkloadAsigneeCard } from "./TeamWorkloadAsigneeCard";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";

type Props = {
  data: TeamWorkloadType[] | undefined;
  allAssignedWork: number;
  totalTasks: number;
};
export function TeamWorkload({
  data,
  allAssignedWork = 0,
  totalTasks = 0,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium"> Team workload / Assigned work</h5>
        <p className="text-wrap">
          Monitor the capacity of your team. Reassign work items to get the
          right balance.
        </p>
        <p>The workload is measured by unfinished work.</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-[1fr] gap-2 w-full overflow-y-auto max-h-125">
        <div className="flex flex-col gap-4">
          <p className="text-md font-medium">Asignee</p>
          <div className="flex flex-col gap-3">
            {data?.map((item) => {
              const assignedTasksPercentage =
                Math.round(
                  (Number(item.value) / Number(allAssignedWork)) * 100,
                ) || 0;

              return (
                <TeamWorkloadAsigneeCard
                  totalTasks={totalTasks}
                  key={item.email}
                  email={item?.email}
                  name={item?.name}
                  avatar={item?.avatar}
                  value={item?.value}
                  assignedTasksPercentage={assignedTasksPercentage}
                  allAssignedWork={allAssignedWork}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-col gap-4 hidden md:flex ">
          <p className="text-md font-medium">Distribution</p>
          <div className="flex flex-col gap-3">
            {data?.map((item) => {
              const assignedTasksPercentage =
                Math.round(
                  (Number(item.value) / Number(allAssignedWork)) * 100,
                ) || 0;

              if (item.email === UNASSIGNED_CARD.email) {
                return (
                  <div
                    key={item.email}
                    className="flex items-center gap-2 text-xl"
                  >
                    <p>
                      Unassigned: <strong>{item.value}</strong>
                    </p>
                    <p>
                      Total tasks: <strong>{totalTasks}</strong>
                    </p>
                  </div>
                );
              }
              return (
                <Tooltip key={item.email}>
                  <TooltipTrigger className=" text-gray-400 cursor-pointer">
                    <TeamWorkloadDistributionCard
                      assignedTasksPercentage={assignedTasksPercentage}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="min-w-20 max-w-80 flex flex-col gap-1">
                    <TeamWorkloadDistributionCardTooltipContent
                      email={item?.email}
                      value={item?.value}
                      assignedTasksPercentage={assignedTasksPercentage}
                      allAssignedWork={allAssignedWork}
                    />
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
