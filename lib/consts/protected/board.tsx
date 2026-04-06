import {
  Calendar1,
  ChartColumn,
  CircleCheck,
  Columns3,
  FolderCheck,
  LayoutList,
  RefreshCcw,
  Wifi,
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
    id: "dueSoon",
    title: "Due in 7 days",
    icon: <Calendar1 className="text-tertiary" />,
  },
  {
    id: "expiredDue",
    title: "Due expired",
    icon: <Calendar1 className="text-red-700" />,
  },
  {
    id: "priority",
    title: "Priority",
    icon: <Wifi className="text-orange-600" />,
  },
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
];
