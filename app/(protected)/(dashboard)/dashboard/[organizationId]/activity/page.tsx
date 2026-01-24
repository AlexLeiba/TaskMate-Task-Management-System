import { ActivitySkeletonCard } from "@/components/layout/Protected/Pages/Activities/ActivitySkeletonCard";
import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";

const ActivityServerRender = dynamic(
  () => {
    return import("@/components/layout/Protected/Pages/Activities/ActivityServerRender").then(
      (m) => m.ActivityServerRender,
    );
  },
  {
    loading: () => <ActivitySkeletonCard />,
  },
);

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

      <ActivityServerRender page={page} />
    </div>
  );
}

export default ActivitiesPage;
