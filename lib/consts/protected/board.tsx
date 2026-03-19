import {
  Calendar1,
  ChartColumn,
  CircleCheck,
  Columns3,
  FolderCheck,
  LayoutList,
  RefreshCcw,
} from "lucide-react";
import { BoardTab, FilterData } from "../../types";

export const BOARD_HEADER_TABS: BoardTab[] = [
  { id: "1", label: "Overview", value: "overview", icon: <ChartColumn /> },
  { id: "2", label: "Board", value: "board", icon: <Columns3 /> },
  { id: "3", label: "List", value: "list", icon: <LayoutList /> },
  {
    id: "4",
    label: "Refresh board",
    value: "refresh",
    icon: <RefreshCcw />,
  },
];

export const FILTERS_DATA: FilterData[] = [
  {
    id: "completed",
    title: "Completed",
    icon: <CircleCheck className="text-green-400" />,
  },
  {
    id: "created",
    title: "Recent created",
    icon: <FolderCheck className="text-yellow-400" />,
  },
  {
    id: "dueSoon",
    title: "Due soon",
    icon: <Calendar1 className="text-tertiary" />,
  },
];
