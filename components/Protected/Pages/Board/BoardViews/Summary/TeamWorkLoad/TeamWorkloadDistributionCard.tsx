import { cn } from "@/lib/utils";

type Props = {
  assignedTasksPercentage: number;
};
export function TeamWorkloadDistributionCard({
  assignedTasksPercentage = 0,
}: Props) {
  return (
    <div className="h-full relative hover:opacity-70 ">
      <div className=" h-8.75 w-full bg-muted" />
      <div
        className="h-8.75 absolute top-0 left-0 bg-gray-300"
        style={{
          width: `${assignedTasksPercentage}%`,
        }}
      >
        <p
          className={cn(
            assignedTasksPercentage === 0 ? "text-primary" : "text-muted",
            "py-1 px-2 font-medium",
          )}
        >
          {assignedTasksPercentage}%
        </p>
      </div>
    </div>
  );
}
