import { Spacer } from "@/components/ui/spacer";
import { ActivityCard } from "./ActivityCard";
import { ActivityCardSkeleton } from "./ActivityCardSkeleton";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Activity } from "lucide-react";
import {
  type Activity as ActivityType,
  User,
} from "@/lib/generated/prisma/client";
import { getCardDetailsActivities } from "@/app/actions/card-details";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  cardDetailsId: string;
};
export function Activities({ cardDetailsId }: Props) {
  const { orgId } = useAuth();
  const [activities, setActivities] = useState<
    (ActivityType & { author: User })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO add useQuery instead of useEffect and useState
  async function getActivitiesData() {
    const response = await getCardDetailsActivities(cardDetailsId);

    if (response?.error?.message) {
      setIsLoading(false);
      return toast.error(response.error.message);
    }

    if (response?.data) {
      setIsLoading(false);
      setActivities(response.data);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    setIsLoading(true);
    getActivitiesData();
  }, [cardDetailsId]);

  // fetch activities based on card and list id
  if (isLoading)
    return (
      <>
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
        <ActivityCardSkeleton />
      </>
    );
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
      <div className="flex flex-col gap-4 overflow-y-auto h-58  ">
        {/* ATTACHMENTS */}
        {activities?.map((activity) => (
          <ActivityCard key={activity.id} data={activity} />
        ))}
      </div>
    </section>
  );
}
