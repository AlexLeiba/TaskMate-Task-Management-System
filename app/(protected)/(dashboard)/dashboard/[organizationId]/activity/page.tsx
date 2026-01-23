import { getActivitiesAction } from "@/app/actions/activity";
import { ActivityCard } from "@/components/layout/Protected/Pages/Activities/ActivityCard";
import { PaginationButton } from "@/components/layout/Protected/Pages/Activities/PaginationButton";
import { UserCard } from "@/components/layout/Protected/UserCard/UserCard";
import { UserCardSkeleton } from "@/components/layout/Protected/UserCard/UserCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { Spacer } from "@/components/ui/spacer";

import { Activity } from "lucide-react";

const activitiesData = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/500/500",
    name: "name",
    email: "email",
    createdAt: Date.now(),
    activity: "name with email modified a board",
    activityType: "Updated",
    boardName: "board name",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/500/500",
    name: "name",
    email: "email",
    createdAt: Date.now(),
    activity: "the card 'new card'",
    activityType: "Deleted",
    boardName: "board name",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/500/500",
    name: "name",
    email: "email",
    createdAt: Date.now(),
    activity: "created new list",
    activityType: "Created",
    boardName: "board name",
  },
];
async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  console.log("🚀 ~ ActivitiesPage ~ page:", page);
  const { data: activityData, count } = await getActivitiesAction({
    limit: 10,
    page: Number(page) || 1,
  });
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Activities</h1>
        <Activity />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <div className="flex flex-col gap-2 justify-between h-full">
        <div className="flex flex-col gap-4 ">
          {activitiesData ? (
            activityData?.map((activity) => (
              // <ActivityCard key={activity.id} data={activity} />
              <UserCard
                key={activity.id}
                data={activity.author}
                description={activity.activity}
                createdAt={activity.createdAt.toString()}
                type="activity"
              />
            ))
          ) : (
            <UserCardSkeleton size={"md"} />
          )}
        </div>

        <PaginationButton dataLength={count} />
      </div>
    </div>
  );
}

export default ActivitiesPage;
