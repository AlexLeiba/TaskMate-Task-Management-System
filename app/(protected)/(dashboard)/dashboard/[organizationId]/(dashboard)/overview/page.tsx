import { OrgOverviewServerRender } from "@/components/Protected/Pages/OrgOverview/OrgOverviewServerRender";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import { Suspense } from "react";

async function OverviewPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <div className="w-full" data-test="overview-page">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Overview</h1>
        <Globe />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <Suspense fallback={<div>Loading...</div>}>
        <OrgOverviewServerRender organizationId={organizationId} />
      </Suspense>
    </div>
  );
}

export default OverviewPage;
