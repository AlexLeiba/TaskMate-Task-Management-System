import { getSummaryStatsAction } from "@/app/actions/summary";
import { OrgSummary } from "@/components/Protected/Pages/Summary/OrgSummary";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";

async function SummaryPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  const response = await getSummaryStatsAction(organizationId, null);
  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Summary</h1>
        <Globe />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <OrgSummary data={response} />
    </div>
  );
}

export default SummaryPage;
