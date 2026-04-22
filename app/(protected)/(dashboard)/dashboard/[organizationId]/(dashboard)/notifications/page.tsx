import { Suspense } from "react";
import { ActivitySkeletonCard } from "@/components/Protected/Pages/Activities/ActivitySkeletonCard";
import { NotificationsServerRender } from "@/components/Protected/Pages/Notifications/NotificationsServerRender";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Notifications</h1>
        <Bell />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <Suspense fallback={<ActivitySkeletonCard />}>
        <NotificationsServerRender page={page} />
      </Suspense>
    </div>
  );
}

export default NotificationsPage;
