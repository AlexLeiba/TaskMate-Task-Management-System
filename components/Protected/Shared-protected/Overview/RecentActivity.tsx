import { getRecentActivitiesAction } from "@/app/actions/overview";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { Button } from "@/components/ui/button";
import { useBoardId } from "@/hooks/useBoardId";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

export function RecentActivity() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardSummary() {
    if (!boardId || !orgId) return;
    try {
      const response = await getRecentActivitiesAction(orgId, boardId);

      return response?.data;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board summary, please try again",
      );
    }
  }

  const { data } = useQuery({
    queryFn: fetchBoardSummary,
    queryKey: [QUERY_KEYS.pages.board.overview.recentActivities],
    staleTime: 1000, // TODO : change to 5 min.
    gcTime: 1000, // TODO : change to 5 min.
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h5 className="text-2xl font-medium">Recent activity</h5>
          <p> Stay up to date with what`s happening across the space.</p>
          <p className="text-primary/70">last 10 activities</p>
        </div>

        <Link href={`/dashboard/${orgId}/activity`} target="_blank">
          <Button variant={"link"} className="text-tertiary">
            <p className="text-base">See all activities</p>
          </Button>
        </Link>
      </div>

      <div className=" flex flex-col gap-4 overflow-y-auto max-h-125 ">
        {data?.map((activity) => {
          return (
            <div key={activity.id}>
              <UserCard
                key={activity.id}
                data={activity.author}
                description={activity.activity}
                createdAt={activity.createdAt as unknown as string}
                type="activity"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
