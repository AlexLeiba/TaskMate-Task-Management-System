import { getOverviewStatsAction } from "@/app/actions/overview";
import { OrgSummary } from "./OrgOverview";

type Props = {
  organizationId: string;
};
export async function OrgOverviewServerRender({ organizationId }: Props) {
  const response = await getOverviewStatsAction(organizationId, null);
  return <OrgSummary data={response} />;
}
