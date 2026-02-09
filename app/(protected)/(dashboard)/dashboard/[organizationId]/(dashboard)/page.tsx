import { BoardCardSkeleton } from "@/components/layout/Protected/Pages/Dashboard/Boards/BoardCardSkeleton";
import { BoardsServerRender } from "@/components/layout/Protected/Pages/Dashboard/BoardsServerRender";
import { OrgDetails } from "@/components/layout/Protected/Pages/Dashboard/OrgDetails";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

async function DashboardPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const orgId = (await params).organizationId;

  return (
    <div className="w-full">
      <OrgDetails />
      <Separator className="bg-gray-600 w-full my-4 " />
      <Suspense fallback={<BoardCardSkeleton />}>
        <BoardsServerRender orgId={orgId} />
      </Suspense>
    </div>
  );
}

export default DashboardPage;
