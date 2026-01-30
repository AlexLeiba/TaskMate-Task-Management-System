import { UserCard } from "../../../../../../../UserCard/UserCard";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

import { Activity, User } from "@/lib/generated/prisma/client";

type Props = {
  data: Activity & { author: User };
};
export function ActivityCard({ data: activity }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <UserCard data={activity.author} size="sm" />
      <p>{activity.activity}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-xs text-gray-400">
          {format(new Date(activity?.createdAt as Date), "MMM d yyyy a HH:mm")}
        </p>
      </div>
      <Separator className="h-px my-2" />
    </div>
  );
}
