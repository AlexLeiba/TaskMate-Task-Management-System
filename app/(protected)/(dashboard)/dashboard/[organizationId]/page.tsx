async function DashboardPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const organizationId = params;
  const orgId = (await organizationId).organizationId;
  console.log("🚀 ~ DashboardPage ~ orgId:", orgId);

  return <div>Dashboard</div>;
}

export default DashboardPage;
