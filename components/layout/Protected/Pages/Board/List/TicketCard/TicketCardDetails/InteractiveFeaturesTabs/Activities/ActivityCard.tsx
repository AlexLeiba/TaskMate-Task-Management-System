import { UserCard } from "../../UserCard/UserCard";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ActivityType } from "@/lib/types";

type Props = {
  data: ActivityType;
};
export function ActivityCard({ data: activity }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <UserCard data={activity.author} size="sm" />
      <p>{activity.activity}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-xs text-gray-400">
          {format(new Date(activity.createdAt), "MMM d yyyy a HH:mm")}
        </p>
      </div>
      <Separator className="h-px my-2" />
    </div>
  );
}
