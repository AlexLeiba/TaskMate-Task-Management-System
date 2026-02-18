"use client";

import { useEffect } from "react";
import { UserCard } from "../../UserCard/UserCard";
import { ActivityWithAuthor } from "@/app/actions/activity";
import toast from "react-hot-toast";

type Props = {
  activityData: {
    data: ActivityWithAuthor[];
    error: { message: string };
  };
};
export function ActivityData({ activityData }: Props) {
  useEffect(() => {
    if (activityData.error.message) toast.error(activityData.error.message);
  }, [activityData.data, activityData.error]);
  return (
    <div className="flex flex-col gap-4">
      {activityData.data?.map((activity) => (
        <UserCard
          key={activity.id}
          data={activity.author}
          description={activity.activity}
          createdAt={activity.createdAt as unknown as string}
          type="activity"
        />
      ))}
    </div>
  );
}
