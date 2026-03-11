import { getSummaryStatsAction } from "@/app/actions/summary";
import { OrgSummary } from "./OrgSummary";

type Props = {
  organizationId: string;
};
export async function OrgSummaryServerRender({ organizationId }: Props) {
  const response = await getSummaryStatsAction(organizationId, null);
  return <OrgSummary data={response} />;
}
