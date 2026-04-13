"use client";

import { useMemo, useState } from "react";
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
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { List } from "@/lib/generated/prisma/client";
import { Search } from "./Search";
import FilterVisibleColumns from "./FilterVisibleColumns";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { Pagination } from "./Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | [];
  data: TData[] | [];
  listStatuses: Pick<List, "id" | "status" | "title">[] | [];
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    listStatuses: Pick<List, "id" | "status" | "title">[];
  }
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  listStatuses = [],
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

  function handleChangePage(direction: "next" | "previous") {
    toast.loading("loading...", {
      id: QUERY_KEYS.pages.board.tableListView.changePage,
    });
    if (direction === "next") {
      table.nextPage();
    } else {
      table.previousPage();
    }
    toast.dismiss(QUERY_KEYS.pages.board.tableListView.changePage);
  }

  return (
    <>
      <div className="flex items-center justify-end space-x-2 absolute top-1 right-4">
        <FilterVisibleColumns columns={allColumns} />

        <Search />

        <Pagination
          disabledPrevious={!table.getCanPreviousPage()}
          disabledNext={!table.getCanNextPage()}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex + 1}
          onChangePage={handleChangePage}
        />
      </div>
      <div className="rounded-md h-full overflow-auto mt-4">
        {data?.length === 0 ? (
          <div className="h-24 flex items-center justify-center">
            No data found.
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}
