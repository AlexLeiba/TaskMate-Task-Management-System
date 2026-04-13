import { useAuth } from "@clerk/nextjs";
import { useBoardId } from "@/hooks/useBoardId";
import { COLUMNS } from "./Columns";
import { DataTable } from "./DataTable";
import { useMemo } from "react";
import { useTableData } from "@/hooks/useTableData";
import { useStore } from "@/store/useStore";

export function ListView() {
  const boardId = useBoardId();
  const { orgId } = useAuth();

  const columnsData = useMemo(() => {
    if (!boardId || !orgId) return [];
    return COLUMNS;
  }, [boardId, orgId]);

  const filters = useStore((state) => state.filterState);

  const { data: boardData } = useTableData(filters);

  return (
    <div className="overflow-y-hidden h-[calc(100vh-108px)] p-4 max-w-400 mx-auto  overflow-x-auto relative">
      <DataTable
        columns={columnsData || []}
        data={boardData?.data?.cards || []}
        listStatuses={boardData?.data?.listStatuses || []}
      />
    </div>
  );
}
