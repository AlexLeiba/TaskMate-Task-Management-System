import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useBoardId } from "@/hooks/useBoardId";

import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { getListDataTableViewAction } from "@/app/actions/list";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CardWithDetailsAndDueDateAndChecklistAndReporterType } from "@/lib/types";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { CARD_PRIORITIES_VALUES } from "@/lib/consts/protected/card";
import { LIST_STATUSES_VALUES } from "@/lib/consts/protected/list";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/lib/consts/consts";
import { DueDateIndicatorCard } from "@/components/Protected/Shared-protected/DueDateIndicatorCard";
import { ChecklistIndicatorCard } from "@/components/Protected/Shared-protected/ChecklistIndicatorCard";
import { Card } from "./Card";

export function ListView() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  async function fetchBoardOverview() {
    if (!boardId || !orgId) return;

    try {
      const response = await getListDataTableViewAction(boardId);
      console.log("🚀 ~ fetchBoardOverview ~ response:", response);

      return response?.data || null;
    } catch (error: any) {
      toast.error(
        error.message || "Error getting board data, please try again",
      );

      return null;
    }
  }

  const { data: boardData } = useQuery({
    queryFn: fetchBoardOverview,
    queryKey: [QUERY_KEYS.pages.board.listView.getAllBoardData],
    staleTime: 1000, // TODO : change to 5 min.
    gcTime: 1000, // TODO : change to 5 min.
    refetchOnMount: true,
  });

  const columns:
    | ColumnDef<CardWithDetailsAndDueDateAndChecklistAndReporterType>[]
    | null
    | undefined = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2" title={row.original.title}>
            <p className="text-xl max-w-50 line-clamp-1">
              {row.original.title}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "assignedToEmail",
      header: "Assignee",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.assignedTo ? (
              <UserCard data={row.original.assignedTo} size={"md"} />
            ) : (
              <p>No Assignee</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "reporterId",
      header: "Reporter",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.reporter ? (
              <UserCard data={row.original.reporter} size={"sm"} />
            ) : (
              <p>No Reporter</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        return (
          <Card>
            <p>{CARD_PRIORITIES_VALUES[row.original.priority]?.label}</p>
            <div>{CARD_PRIORITIES_VALUES[row.original.priority]?.icon}</div>
          </Card>
        );
      },
    },
    {
      accessorKey: "list.status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Card>
            <p>{LIST_STATUSES_VALUES[row.original.list.status]?.label}</p>
            <div>{LIST_STATUSES_VALUES[row.original.list.status]?.icon}</div>
          </Card>
        );
      },
    },
    {
      accessorKey: "details.dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        return <DueDateIndicatorCard data={row.original.details?.dueDate[0]} />;
      },
    },
    {
      accessorKey: "details.checklist",
      header: "Checklist",
      cell: ({ row }) => {
        return (
          <ChecklistIndicatorCard data={row.original.details?.checklist} />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <Card>
            <p className="text-xs font-medium">
              {row.original?.createdAt &&
                format(new Date(row.original?.createdAt), DATE_FORMAT)}
            </p>
          </Card>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        return (
          <Card>
            <p className="text-xs font-medium">
              {row.original?.updatedAt &&
                format(new Date(row.original?.updatedAt), DATE_FORMAT)}
            </p>
          </Card>
        );
      },
    },
  ];

  return (
    <div className="overflow-y-hidden h-[calc(100vh-165px)]">
      {boardData?.data && (
        <DataTable columns={columns} data={boardData?.data} />
      )}
    </div>
  );
}
