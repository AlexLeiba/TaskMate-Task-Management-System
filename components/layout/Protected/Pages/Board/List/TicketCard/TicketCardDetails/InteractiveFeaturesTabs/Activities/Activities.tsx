import { ActivityType } from "@/lib/types";
import { Activity } from "lucide-react";
import { Spacer } from "@/components/ui/spacer";
import { ActivityCard } from "./ActivityCard";
import { ActivityCardSkeleton } from "./ActivityCardSkeleton";

// TODO fetch activities when open the tab
// show skeleton while downloading

const now = new Date("2023-01-01T00:00:00").getTime();
const activitiesData: ActivityType[] = [
  {
    id: "1",
    activity: "Modified the board name",
    activityType: "Updated",
    boardName: "board name",
    listName: "list name",
    boardId: "123",
    listId: "1233",
    createdAt: now,
    author: {
      email: "sample@example.com",
      name: "Sample User1",
      avatar: `https://picsum.photos/300/300`,
      id: "1232",
    },
  },
  {
    id: "2",
    activity: "Deleted the board name",
    activityType: "Updated",
    boardName: "board name",
    listName: "list name",
    boardId: "12334",
    listId: "123343",
    createdAt: now,
    author: {
      email: "sample@example.com",
      name: "Sample User2",
      avatar: `https://picsum.photos/300/300`,
      id: "1232",
    },
  },
  {
    id: "3",
    activity: "Modified the board name",
    activityType: "Updated",
    boardName: "board name",
    listName: "list name",
    boardId: "123",
    listId: "1233",
    createdAt: now,
    author: {
      email: "sample@example.com",
      name: "Sample User1",
      avatar: `https://picsum.photos/300/300`,
      id: "1232",
    },
  },
];

type Props = {
  cardId: string;
  listId: string | undefined;
};
export function Activities({ cardId, listId }: Props) {
  // fetch activities based on card and list id
  if (!activitiesData) return <ActivityCardSkeleton />;
  return (
    <section>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <Activity />
          <h5 className="text-xl font-medium">Activities</h5>
        </div>
      </div>
      <Spacer size={4} />
      <div className="flex flex-col gap-4 overflow-y-auto h-54">
        {/* ATTACHMENTS */}
        {activitiesData?.map((activity) => (
          <ActivityCard key={activity.id} data={activity} />
        ))}
      </div>
    </section>
  );
}
