import { ActivityType } from "@/lib/types";
import Image from "next/image";

type Props = {
  data: ActivityType;
};
export function ActivityCard({ data: activity }: Props) {
  return (
    <div key={activity.id} className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        {activity.imageUrl && (
          <Image
            src={activity.imageUrl}
            alt={activity.name}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        )}
        <div className="flex gap-2 items-center">
          <p className="text-lg font-medium">{activity.name}</p>
          <p className="text-sm">{activity.email}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-lg font-medium">{activity.activityType}</p>
        <p className="text-base">{activity.activity}</p>
        <p className="text-lg font-medium">{activity.boardName}</p>
      </div>
    </div>
  );
}
