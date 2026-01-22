import { Boards } from "@/components/layout/Protected/Pages/Dashboard/Boards/Boards";
import { OrgDetails } from "@/components/layout/Protected/Pages/Dashboard/OrgDetails";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { BoardType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

const boardData: BoardType[] = [
  {
    title: "Boards",
    imageUrl: "https://picsum.photos/500/500",
    id: "1",
    orgId: "1",
  },
  {
    title: "Activity",
    imageUrl: "https://picsum.photos/500/500",
    id: "2",
    orgId: "1",
  },
  {
    title: "Members",
    imageUrl: "https://picsum.photos/500/500",
    id: "3",
    orgId: "1",
  },
  {
    title: "Settings",
    imageUrl: "https://picsum.photos/500/500",
    id: "4",
    orgId: "1",
  },
];
async function DashboardPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  //TODO get cards data on server side api req

  const orgId = (await params).organizationId;
  const {} = await auth();

  const boardData = await prisma.board.findMany({});

  return (
    <div className="w-full">
      <OrgDetails />
      <Separator className="bg-gray-600 w-full my-4" />
      <Boards data={boardData} />
    </div>
  );
}

export default DashboardPage;
