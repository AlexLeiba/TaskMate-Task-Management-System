import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { TABLE_COLUMNS } from "@/lib/consts/protected/table";
import { Column } from "@tanstack/react-table";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  columns: Column<any, unknown>[];
};

const FilterVisibleColumns = ({ columns }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  function handleToggleColumn(toggleFn: () => void) {
    toggleFn();
    toast.dismiss("toggle-column");
  }
  const delayHandleToggleColumn = useDebounce(handleToggleColumn, 100);

  function handleLocalToggleColumn(columnId: string) {
    toast.loading("Updating columns...", { id: "toggle-column" });
    setSelectedColumns((prev) => {
      if (prev.includes(columnId)) {
        return prev.filter((id) => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  }

  useEffect(() => {
    setSelectedColumns(
      columns
        .filter((column) => column.getIsVisible())
        .map((column) => column.id),
    );
  }, [columns]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-auto h-6" size={"sm"}>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={selectedColumns.includes(column.id)}
                onCheckedChange={(value) => {
                  handleLocalToggleColumn(column.id);

                  delayHandleToggleColumn(() =>
                    column.toggleVisibility(!!value),
                  );
                }}
              >
                {TABLE_COLUMNS[column.id as keyof typeof TABLE_COLUMNS]}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(FilterVisibleColumns);
