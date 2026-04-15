import { COLUMNS } from "./Columns/Columns";
import { DataTable } from "./DataTable";
import { useMemo } from "react";
import { useTableData } from "@/hooks/useTableData";
import { useStore } from "@/store/useStore";

const EMPTY_DATA: any[] = [];

export function ListView() {
  const filters = useStore((state) => state.filterState);

  const { data: boardData, isLoading } = useTableData(filters);

  const stableColumns = useMemo(() => {
    return COLUMNS;
  }, []);

  return (
    <div className="overflow-y-hidden h-[calc(100vh-108px)] p-4 max-w-400 mx-auto  overflow-x-auto relative">
      <DataTable
        isLoading={isLoading}
        columns={stableColumns || EMPTY_DATA}
        data={(boardData && boardData?.data?.cards) || EMPTY_DATA}
        listStatuses={boardData?.data?.listStatuses || EMPTY_DATA}
      />
    </div>
  );
}
