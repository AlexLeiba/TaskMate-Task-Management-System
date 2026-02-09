import { ActivityServerRender } from "@/components/layout/Protected/Pages/Activities/ActivityServerRender";
import { ActivitySkeletonCard } from "@/components/layout/Protected/Pages/Activities/ActivitySkeletonCard";
import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";

import { Suspense } from "react";

async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Activities</h1>
        <Activity />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <Suspense fallback={<ActivitySkeletonCard />}>
        <ActivityServerRender page={page} />
      </Suspense>
    </div>
  );
}

export default ActivitiesPage;
