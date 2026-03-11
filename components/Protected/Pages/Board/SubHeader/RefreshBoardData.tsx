import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { RefreshCcw } from "lucide-react";

export function RefreshBoardData() {
  const { fetchBoardFilteredListData, loading } = useGetBoardFilteredData();
  return (
    <IconButton
      disabled={loading}
      loading={loading}
      onClick={() => fetchBoardFilteredListData("")}
      title="Refresh board data"
      aria-label="Refresh board data"
      className="p-2 hidden md:block"
    >
      <RefreshCcw size={24} />
    </IconButton>
  );
}
