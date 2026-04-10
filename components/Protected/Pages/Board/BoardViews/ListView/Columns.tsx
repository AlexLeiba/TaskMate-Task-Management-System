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
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AssignTo } from "../../../../Shared-protected/AssignTo/AssignTo";
import { Priority } from "@/components/Protected/Shared-protected/Priority/Priority";
import { Status } from "@/components/Protected/Shared-protected/Status/Status";
import { useState } from "react";

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
            aria-label="Select all"
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
          />
          <div className="flex items-center gap-2" title={row.original.title}>
            <p className="text-xl max-w-50 line-clamp-1">
              {row.original.title}
            </p>
          </div>
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
        <Button
          onClick={() =>
            table.options.meta?.setIsCardDetailsOpened({
              cardTitle: row.original.title,
              listTitle: row.original.listName,
              cardDetailsId: row.original.id,
              isVisible: true,
            })
          }
          variant={"secondary"}
          className="w-full"
          classNameChildren="flex items-center justify-between gap-1"
        >
          <p>{LIST_STATUSES_VALUES[row.original.list.status]?.label}</p>
          <div>{LIST_STATUSES_VALUES[row.original.list.status]?.icon}</div>
        </Button>
      );
    },
  },
  {
    accessorKey: "details.dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return (
        <>
          {row.original.details?.dueDate.length === 0 && (
            <Button size={"sm"} variant={"secondary"}>
              Add +
            </Button>
          )}
          <DueDateIndicatorCard data={row.original.details?.dueDate[0]} />
        </>
      );
    },
  },
  {
    accessorKey: "details.checklist",
    header: "Checklist",
    cell: ({ row }) => {
      return (
        <>
          {row.original.details?.checklist.length === 0 && (
            <Button size={"sm"} variant={"secondary"}>
              Add +
            </Button>
          )}
          <ChecklistIndicatorCard data={row.original.details?.checklist} />
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
