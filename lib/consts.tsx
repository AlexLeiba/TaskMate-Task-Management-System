import {
  Archive,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  Plus,
  Search,
  Wifi,
  WifiHigh,
  WifiLow,
} from "lucide-react";

export const NAV_LINKS = {
  landing: {
    href: "/",
    label: "Home",
  },
  signin: {
    href: "/sign-in",
    label: "Sign in",
  },
  signup: {
    href: "/sign-up",
    label: "Sign up",
  },
  about: {
    href: "/about",
    label: "About",
  },
  dashboard: {
    href: "/dashboard",
    label: "Dashboard",
  },
};
export const BREAKPOINTS = [{}];

export const LIST_STATUSES = [
  {
    label: "Todo",
    value: "todo",
    icon: <Circle />,
  },
  {
    label: "In Progress",
    value: "in-progress",
    icon: <Clock />,
  },
  {
    label: "In Review",
    value: "in-review",
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
];

export const CARD_PRIORITIES = [
  {
    label: "Low",
    value: "low",
    icon: <WifiLow />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <WifiHigh />,
  },
  {
    label: "High",
    value: "high",
    icon: <Wifi />,
  },
  {
    label: "Urgent",
    value: "urgent",
    icon: <CircleAlert />,
  },
  {
    label: "None",
    value: "none",
  },
];
