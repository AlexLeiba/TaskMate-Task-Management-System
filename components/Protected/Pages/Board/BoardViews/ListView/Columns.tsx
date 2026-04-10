import { ColumnDef } from "@tanstack/react-table";
import { CardWithDetailsAndDueDateAndChecklistAndReporterType } from "@/lib/types";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/lib/consts/consts";
import { DueDateIndicatorCard } from "@/components/Protected/Shared-protected/DueDateIndicatorCard";
import { ChecklistIndicatorCard } from "@/components/Protected/Shared-protected/ChecklistIndicatorCard";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AssignTo } from "../../../../Shared-protected/AssignTo/AssignTo";
import { Priority } from "@/components/Protected/Shared-protected/Priority/Priority";
import { IconButton } from "@/components/ui/iconButton";
import { Status } from "@/components/Protected/Shared-protected/Status/Status";

export const COLUMNS:
  | ColumnDef<CardWithDetailsAndDueDateAndChecklistAndReporterType>[]
  | null
  | undefined = [
  {
    accessorKey: "title",
    header: ({ column, table }) => {
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);

              table.getRowModel().rows.forEach((row) => {
                table.setRowSelection((prev) => {
                  return {
                    ...prev,
                    [row.original.id]: !!value,
                  };
                });
              });
            }}
            aria-label="Select all rows"
            title="Select all rows"
          />
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            classNameChildren="flex items-center"
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row, table }) => {
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);

              table.setRowSelection((prev) => {
                return {
                  ...prev,
                  [row.original.id]: !!value,
                };
              });
            }}
            aria-label="Select row"
            title="Select row"
          />

          <IconButton
            onClick={() =>
              table.options.meta?.setIsCardDetailsOpened({
                cardTitle: row.original.title,
                listTitle: row.original.listName,
                cardDetailsId: row.original.id,
                isVisible: true,
              })
            }
            className="flex items-center gap-2 w-full p-1 text-left"
            title={`Open - ${row.original.title}`}
          >
            <p className="text-xl max-w-50 line-clamp-1">
              {row.original.title}
            </p>
          </IconButton>
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
          {row.original && (
            <AssignTo
              assignedTo={row.original.assignedTo?.email || ""}
              listId={row.original.listId || ""}
              cardDetailsId={row.original.id || ""}
              type={"table"}
            />
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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
          classNameChildren="flex items-center justify-between "
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        row.original.priority && (
          <Priority
            priority={row.original.priority}
            listId={row.original.listId}
            cardDetailsId={row.original.id}
            type={"table"}
          />
        )
      );
    },
  },
  {
    accessorKey: "list.status",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
          classNameChildren="flex items-center justify-between "
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      return (
        <Status
          listId={row?.original?.listId}
          cardId={row?.original?.id}
          listsData={table.options.meta?.listStatuses || []}
          type={"table"}
        />
      );
    },
  },
  {
    accessorKey: "details.dueDate",
    header: "Due Date",
    cell: ({ row, table }) => {
      return (
        <>
          {
            <Button
              variant={"secondary"}
              onClick={() =>
                table.options.meta?.setIsCardDetailsOpened({
                  cardTitle: row.original.title,
                  listTitle: row.original.listName,
                  cardDetailsId: row.original.id,
                  isVisible: true,
                })
              }
              className="flex items-center gap-2 w-full text-left"
              title={`Add due date to ${row.original.title}`}
              aria-label={`Add due date to ${row.original.title}`}
            >
              {row?.original?.details?.dueDate?.length &&
              row?.original?.details?.dueDate?.length > 0 ? (
                <DueDateIndicatorCard data={row.original.details?.dueDate[0]} />
              ) : (
                <p>Add +</p>
              )}
            </Button>
          }
        </>
      );
    },
  },
  {
    accessorKey: "details.checklist",
    header: "Checklist",
    cell: ({ row, table }) => {
      return (
        <>
          {
            <Button
              variant={"secondary"}
              onClick={() =>
                table.options.meta?.setIsCardDetailsOpened({
                  cardTitle: row.original.title,
                  listTitle: row.original.listName,
                  cardDetailsId: row.original.id,
                  isVisible: true,
                })
              }
              className="flex items-center gap-2 w-full text-left"
              title={`Add checklist to ${row.original.title}`}
              aria-label={`Add checklist to ${row.original.title}`}
            >
              {row.original.details?.checklist?.length &&
              row.original.details?.checklist?.length > 0 ? (
                <ChecklistIndicatorCard
                  data={row.original.details?.checklist}
                />
              ) : (
                <p>Add +</p>
              )}
            </Button>
          }
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
          classNameChildren="flex items-center justify-between "
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-xs font-medium">
          {row.original?.createdAt &&
            format(new Date(row.original?.createdAt), DATE_FORMAT)}
        </p>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
          classNameChildren="flex items-center justify-between "
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-xs font-medium">
          {row.original?.updatedAt &&
            format(new Date(row.original?.updatedAt), DATE_FORMAT)}
        </p>
      );
    },
  },
];
