import React from "react";

type Props = {
  value: number;
  email: string;
  assignedTasksPercentage: number;
  allAssignedWork: number;
};
export function TeamWorkloadDistributionCardTooltipContent({
  value,
  email,
  assignedTasksPercentage,
  allAssignedWork,
}: Props) {
  return (
    <>
      <p className="text-base ">
        Total assigned work: <strong>{Number(allAssignedWork || 0)}</strong>
      </p>
      <p className="text-base ">
        {email}: <strong>{Number(value || 0)}</strong>
      </p>
      <p className="text-base">
        {assignedTasksPercentage}%
        {` (${Number(value || 0)} / ${Number(allAssignedWork || 0)})`}
      </p>
    </>
  );
}
