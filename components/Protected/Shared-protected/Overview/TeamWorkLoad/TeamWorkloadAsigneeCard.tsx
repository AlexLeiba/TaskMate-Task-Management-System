import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";

type Props = {
  email: string;
  name: string;
  avatar?: string;
  value: number;
  assignedTasksPercentage: number;
  allAssignedWork: number;
  totalTasks: number;
};
export function TeamWorkloadAsigneeCard({
  email,
  name,
  avatar,
  value,
  assignedTasksPercentage,
  allAssignedWork,
  totalTasks,
}: Props) {
  return (
    <div
      key={email}
      className="flex items-center justify-between gap-1 flex-wrap  rounded-md"
    >
      <UserCard
        size={"sm"}
        data={{
          name: name,
          avatar: avatar || "/avatar-default.svg",
          email: email,
        }}
      />

      {/* MOBILE PERCENTAGE VIEW */}
      {/* ASSIGNED VIEW */}
      {email !== UNASSIGNED_CARD.email ? (
        <p className={"text-base md:hidden"}>
          {assignedTasksPercentage}%
          {` (${Number(value)} / ${Number(allAssignedWork)})`}
        </p>
      ) : (
        // UNASSIGNED VIEW
        <p className="text-base md:hidden" key={email}>
          ( {value} / {totalTasks} )
        </p>
      )}
    </div>
  );
}
