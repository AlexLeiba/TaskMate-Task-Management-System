import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { useStore } from "@/store/useStore";
import { RefreshCcw } from "lucide-react";

export function RefreshBoardData() {
  const { fetchBoardFilteredListData, loading } = useGetBoardFilteredData();
  const setBoardTabSections = useStore((state) => state.setBoardTabSections);
  return (
    <IconButton
      disabled={loading}
      loading={loading}
      onClick={() => {
        setBoardTabSections("refresh");
        fetchBoardFilteredListData("");
      }}
      title="Refresh board data"
      aria-label="Refresh board data"
      className="p-2 hidden md:block"
    >
      <RefreshCcw size={24} />
    </IconButton>
  );
}
