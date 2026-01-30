import { Spacer } from "@/components/ui/spacer";
import { ActivityCard } from "./ActivityCard";
import { ActivityCardSkeleton } from "./ActivityCardSkeleton";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { type Activity as ActivityType } from "@/lib/generated/prisma/browser";
import { Activity } from "lucide-react";
import { User } from "@/lib/generated/prisma/client";

const now = new Date("2023-01-01T00:00:00").getTime();

type Props = {
  cardId: string;
  listId: string | undefined;
};
export function Activities({ cardId, listId }: Props) {
  const { orgId } = useAuth();

  const activitiesData: (ActivityType & { author: User })[] = [];

  const { data, isLoading } = useQuery({
    queryFn: () => {},
    queryKey: ["activities"],
    staleTime: 1000 * 60 * 60,
  });

  // fetch activities based on card and list id
  if (!activitiesData) return <ActivityCardSkeleton />;
  return (
    <section>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <Activity />
          <h5 className="text-xl font-medium">Activities</h5>
        </div>
        <Link
          href={`/dashboard/${orgId}/activity`}
          target="_blank"
          title="All activities"
          aria-label="All activities"
        >
          <p className="text-base text-gray-300  underline underline-offset-2">
            All Activities
          </p>
        </Link>
      </div>
      <Spacer size={4} />
      {/* SCROLLABLE SECTION */}
      <div className="flex flex-col gap-4 overflow-y-auto h-64 ">
        {/* ATTACHMENTS */}
        {activitiesData?.map((activity) => (
          <ActivityCard key={activity.id} data={activity} />
        ))}
      </div>
    </section>
  );
}
