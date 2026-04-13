"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { List } from "@/lib/generated/prisma/client";
import { Search } from "./Search";
import FilterVisibleColumns from "./FilterVisibleColumns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  listStatuses: Pick<List, "id" | "status" | "title">[];
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    listStatuses: Pick<List, "id" | "status" | "title">[];
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  listStatuses,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    useLocalStorage<VisibilityState>("columns-visibility", {});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    data,
    columns,
    meta: {
      listStatuses,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const allColumns = useMemo(() => table.getAllColumns(), []);

  return (
    <>
      <div className="flex items-center justify-end space-x-2 absolute top-1 right-4">
        <FilterVisibleColumns columns={allColumns} />
        <Search />
        <div className="flex items-center gap-1 bg-background px-2 rounded-md">
          Page: <p>{table.getState().pagination.pageIndex + 1}</p>/
          <p>{table.getPageCount()}</p>
        </div>

        <Button
          aria-label="Previous page"
          title="Previous page"
          className="h-6"
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          aria-label="Next page"
          title="Next page"
          className="h-6"
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="rounded-md h-full overflow-auto mt-4">
        <Table className="bg-card-foreground/95 w-full h-full border-collapse">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white bg-card border  sticky top-0 z-10"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="table-body">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" p-4 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
