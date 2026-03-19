import {
  Archive,
  Circle,
  CircleCheck,
  Clock,
  Copy,
  Delete,
  Edit,
  Plus,
  Search,
} from "lucide-react";

export const LIST_STATUSES = [
  {
    label: "Todo",
    value: "todo",
    icon: <Circle />,
  },
  {
    label: "In Progress",
    value: "progress",
    icon: <Clock className="text-yellow-400" />,
  },
  {
    label: "In Review",
    value: "review",
    icon: <Search className="text-green-200" />,
  },
  {
    label: "Done",
    value: "done",
    icon: <CircleCheck className="text-green-400" />,
  },
  {
    label: "Backlog",
    value: "backlog",
    icon: <Archive className="text-orange-400" />,
  },
] as const;

export const CHANGE_LIST_STATUS = {
  todo: {
    label: "Todo",
    value: "todo",
    icon: <Circle />,
  },
  progress: {
    label: "In Progress",
    value: "progress",
    icon: <Clock className="text-yellow-400" />,
  },
  review: {
    label: "In Review",
    value: "review",
    icon: <Search className="text-green-200" />,
  },
  done: {
    label: "Done",
    value: "done",
    icon: <CircleCheck className="text-green-400" />,
  },
  backlog: {
    label: "Backlog",
    value: "backlog",
    icon: <Archive className="text-orange-400" />,
  },
} as const;

export const LIST_OPTIONS = [
  {
    label: "Edit list title",
    value: "edit-list-title",
    icon: <Edit />,
  },
  {
    label: "Add card",
    value: "add-card",
    icon: <Plus />,
  },
  {
    label: "Copy list",
    value: "copy-list",
    icon: <Copy />,
  },
  {
    label: "Delete list",
    value: "delete-list",
    icon: <Delete />,
  },
] as const;
