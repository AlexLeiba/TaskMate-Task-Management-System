import {
  Archive,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Delete,
  Edit,
  Plus,
  Search,
  Wifi,
  WifiHigh,
  WifiLow,
} from "lucide-react";

export const NAV_LINKS = {
  landing: {
    pathname: "/",
    label: "Home",
  },
  signin: {
    pathname: "/sign-in",
    label: "Sign in",
  },
  signup: {
    pathname: "/sign-up",
    label: "Sign up",
  },
  about: {
    pathname: "/about",
    label: "About",
  },
  dashboard: {
    pathname: "/dashboard",
    label: "Dashboard",
  },
  board: {
    pathname: "/board",
    label: "Board",
  },
} as const;
export const BREAKPOINTS = [{}];

export const LIST_STATUSES = [
  {
    label: "Todo",
    value: "todo",
    icon: <Circle />,
  },
  {
    label: "In Progress",
    value: "progress",
    icon: <Clock />,
  },
  {
    label: "In Review",
    value: "review",
    icon: <Search />,
  },
  {
    label: "Done",
    value: "done",
    icon: <CircleCheck />,
  },
  {
    label: "Backlog",
    value: "backlog",
    icon: <Archive />,
  },
] as const;

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

export const CARD_PRIORITIES = [
  {
    label: "None",
    value: "none",
    icon: <>...</>,
  },
  {
    label: "Urgent",
    value: "urgent",
    icon: <CircleAlert className="text-red-600" />,
  },
  {
    label: "High",
    value: "high",
    icon: <Wifi className="text-red-400" />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <WifiHigh className="text-yellow-400" />,
  },
  {
    label: "Low",
    value: "low",
    icon: <WifiLow className="text-green-400" />,
  },
] as const;
export const FAKE_USERS = [
  {
    id: "4",
    name: "No assignee",
    avatar: "",
    email: "",
  },
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/id/1005/200/200",
    email: "bH5d8@example.com",
  },
  {
    id: "2",
    name: "Jora Johnson",
    avatar: "https://picsum.photos/id/1005/200/200",
    email: "bH5d8@example.com",
  },
  {
    id: "3",
    name: "Fedea Johnson",
    avatar: "https://picsum.photos/id/1005/200/200",
    email: "bH5d8@example.com",
  },
];

export const KEYBOARD = {
  ENTER: "Enter",
  SPACE: " ",
} as const;

export const FILES_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
] as const;

export const IMAGES_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;
