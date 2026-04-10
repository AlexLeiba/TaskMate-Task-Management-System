"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TABLE_COLUMNS } from "@/lib/consts/protected/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const TicketCardDetails = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/KanbanView/TicketCard/TicketCardDetails/TicketCardDetails").then(
    (m) => m.TicketCardDetails,
  ),
);

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isCardDetailsOpened, setIsCardDetailsOpened] = useState({
    cardTitle: "",
    listTitle: "",
    cardDetailsId: "",
    isVisible: false,
  });
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
      isCardDetailsOpened,
      setIsCardDetailsOpened,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center justify-end space-x-2 absolute top-1 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="ml-auto h-6" size={"sm"}>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {TABLE_COLUMNS[column.id as keyof typeof TABLE_COLUMNS]}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          className="h-6"
          placeholder="filter by title..."
          value={table.getColumn("title")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />
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

      {isCardDetailsOpened && (
        <TicketCardDetails
          cardTitle={isCardDetailsOpened.cardTitle}
          listTitle={isCardDetailsOpened.listTitle}
          cardDetailsId={isCardDetailsOpened.cardDetailsId}
          isModalOpened={isCardDetailsOpened.isVisible}
          handleCloseModal={() =>
            setIsCardDetailsOpened({
              cardTitle: "",
              listTitle: "",
              cardDetailsId: "",
              isVisible: false,
            })
          }
        />
      )}
    </>
  );
}
