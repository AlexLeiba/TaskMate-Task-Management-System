import { BoardCardSkeleton } from "@/components/layout/Protected/Pages/Dashboard/Boards/BoardCardSkeleton";
import { OrgDetails } from "@/components/layout/Protected/Pages/Dashboard/OrgDetails";
import { Separator } from "@/components/ui/separator";

import dynamic from "next/dynamic";

const BoardsServerRender = dynamic(
  () =>
    import("@/components/layout/Protected/Pages/Dashboard/BoardsServerRender").then(
      (m) => m.BoardsServerRender,
    ),
  {
    loading: () => <BoardCardSkeleton />,
  },
);

async function DashboardPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const orgId = (await params).organizationId;

  return (
    <div className="w-full">
      <OrgDetails />
      <Separator className="bg-gray-600 w-full my-4" />
      <BoardsServerRender orgId={orgId} />
    </div>
  );
}

export default DashboardPage;
