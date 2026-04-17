import { COLUMNS } from "./Columns/Columns";
import { DataTable } from "./DataTable";
import { useTableData } from "@/hooks/useTableData";
import { useStore } from "@/store/useStore";
import { useShallow } from "zustand/shallow";

const EMPTY_DATA: any[] = [];

export function ListView() {
  const filters = useStore(useShallow((state) => state.filterState));

  const { data: boardData, isLoading } = useTableData(filters);

  return (
    <div className="overflow-y-hidden h-[calc(100vh-108px)] p-4 max-w-400 mx-auto  overflow-x-auto relative">
      <DataTable
        isLoading={isLoading}
        columns={COLUMNS || EMPTY_DATA}
        data={boardData?.data?.cards || EMPTY_DATA}
        listStatuses={boardData?.data?.listStatuses || EMPTY_DATA}
      />
    </div>
  );
}
