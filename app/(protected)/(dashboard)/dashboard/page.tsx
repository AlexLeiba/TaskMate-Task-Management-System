import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function DashboardResolverPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { orgId: orgSlug } = await auth();
  console.log("🚀 ~ DashboardResolverPage ~ orgSlug:", orgSlug);

  const organizationId = params;
  const orgParamsId = (await organizationId).organizationId;

  if (!orgSlug) return redirect(`/select-organization`);

  if (orgSlug && (orgSlug !== orgParamsId || !orgParamsId)) {
    return redirect(`/dashboard/${orgSlug}`);
  }

  return <></>;
}

export default DashboardResolverPage;
