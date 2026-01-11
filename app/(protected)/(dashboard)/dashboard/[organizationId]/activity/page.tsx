import { ActivityCard } from "@/components/layout/Protected/Pages/Activities/ActivityCard";
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
function ActivitiesPage() {
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Activities</h1>
        <Activity />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <div className="flex flex-col gap-4">
        {activitiesData.map((activity) => (
          <ActivityCard key={activity.id} data={activity} />
        ))}
      </div>
    </div>
  );
}

export default ActivitiesPage;
