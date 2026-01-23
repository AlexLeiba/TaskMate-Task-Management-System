import { getBoardsAction } from "@/app/actions/dashboard";
import { Boards } from "@/components/layout/Protected/Pages/Dashboard/Boards/Boards";
import { OrgDetails } from "@/components/layout/Protected/Pages/Dashboard/OrgDetails";
import { Separator } from "@/components/ui/separator";

async function DashboardPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const boards = await getBoardsAction();
  return (
    <div className="w-full">
      <OrgDetails />
      <Separator className="bg-gray-600 w-full my-4" />
      <Boards data={boards.data} />
    </div>
  );
}

export default DashboardPage;
