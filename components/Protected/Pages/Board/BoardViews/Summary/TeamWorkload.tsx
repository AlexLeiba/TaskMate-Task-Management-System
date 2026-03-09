import { UserCard } from "@/components/Protected/UserCard/UserCard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TeamWorkloadType } from "@/lib/types";

type Props = {
  data: TeamWorkloadType[] | undefined;
  allAssignedWork: number;
};
export function TeamWorkload({ data, allAssignedWork }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-2xl font-medium"> Team workload </h5>
        <p className="text-wrap">
          Monitor the capacity of your team. Reassign work items to get the
          right balance.
        </p>
        <p>The workload is measured by undone task tickets.</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-[1fr] gap-2 w-full">
        <div className="flex flex-col gap-4">
          <p className="text-md font-medium">Asignee</p>
          <div className="flex flex-col gap-3">
            {data?.map((item) => {
              const assignedTasksPercentage = Math.round(
                (item.value / allAssignedWork) * 100,
              );
              return (
                <div
                  key={item.email}
                  className="flex items-center justify-between gap-1 flex-wrap"
                >
                  <UserCard
                    size={"sm"}
                    data={{
                      name: item.name,
                      avatar: item.avatar,
                      email: item.email,
                    }}
                  />
                  <p className="text-base md:hidden">
                    {assignedTasksPercentage}%
                    {` (${item.value} / ${allAssignedWork})`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-col gap-4 hidden md:flex ">
          <p className="text-md font-medium">Distribution</p>
          <div className="flex flex-col gap-3">
            {data?.map((item) => {
              const assignedTasksPercentage = Math.round(
                (item.value / allAssignedWork) * 100,
              );
              return (
                <Tooltip key={item.email}>
                  <TooltipTrigger
                    asChild
                    className=" text-gray-400 cursor-pointer"
                  >
                    <div className="h-full relative hover:opacity-70">
                      <div className=" h-8.75 w-full bg-muted" />
                      <div
                        className="h-8.75 absolute top-0 left-0 bg-gray-300"
                        style={{
                          width: `${assignedTasksPercentage}%`,
                        }}
                      >
                        <p className="py-1 px-2 text-muted font-medium">
                          {assignedTasksPercentage}%
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="min-w-20 max-w-80 flex flex-col gap-1">
                    <p>{item.email}</p>
                    <p className="text-base">
                      {assignedTasksPercentage}%
                      {` (${item.value} / ${allAssignedWork})`}
                    </p>
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
