import { OrgSummaryServerRender } from "@/components/Protected/Pages/OrgSummary/OrgSummaryServerRender";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import { Suspense } from "react";

async function SummaryPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Summary</h1>
        <Globe />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <Suspense fallback={<div>Loading...</div>}>
        <OrgSummaryServerRender organizationId={organizationId} />
      </Suspense>
    </div>
  );
}

export default SummaryPage;
