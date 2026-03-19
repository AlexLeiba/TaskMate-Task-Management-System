import { CircleAlert, Wifi, WifiHigh, WifiLow } from "lucide-react";
import {
  OrganizationMembersType,
  PrioritiesType,
  TeamWorkloadType,
} from "../../types";

export const CARD_PRIORITIES: {
  label: string;
  value: PrioritiesType;
  icon?: React.ReactNode;
}[] = [
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
    id: "none",
    name: "None",
    avatar: "",
    email: "none",
  },
];

export const TAB_ELEMENTS = [
  {
    label: "Comments",
    value: "comments",
  },
  {
    label: "Attachments",
    value: "attachments",
  },
  {
    label: "Activities",
    value: "activities",
  },
  {
    label: "Checklist",
    value: "checklist",
  },
] as const;

export const UNASSIGNED_CARD: OrganizationMembersType = {
  userId: "unassigned",
  fullName: "Unassigned",
  email: "unassigned",
  imageUrl: "",
};
export const UNASSIGNED_WORKLOAD: TeamWorkloadType = {
  name: "unassigned",
  value: 0,
  email: "unassigned",
  avatar: "",
};
