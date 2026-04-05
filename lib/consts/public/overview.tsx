import { OverviewDataType } from "@/lib/types";

export const OVERVIEW_OPTIONS = [
  "Get an overview of the finished work",

  "Monitor the capacity of your team",

  "Get an overview of how work is being prioritized.",

  "Get a snapshot of the status of your work items",

  "View the activities of a particular board or organization",

  "Visualize a snapshot of all stats",
];

export const OVERVIEW_DATA: OverviewDataType[] = [
  {
    id: 1,
    title: "Finished work overview",
    description:
      "Get an overview of the finished work by each team member for a certain period of time. Filter by last number of days. By default is displayed all time finished work.",
    icon: "/finished-work.png",
  },
  {
    id: 2,
    title: "Team workload / Assigned work",
    description:
      "Monitor the capacity of your team. Reassign work items to get the right balance. The workload is measured by unfinished work.",
    icon: "/team-workload.png",
  },
  {
    id: 3,
    title: "Priority breakdown",
    description:
      "Get an overview of how work is being prioritized, The overview is calculated by only unfished card tickets.",
    icon: "/priority-2.png",
  },
  {
    id: 4,
    title: "Status overview",
    description:
      "Get a snapshot of the status of your work items, View all work items grouped by status",
    icon: "/status.png",
  },
  {
    id: 5,
    title: "Activity",
    description:
      "Stay up to date with what`s happening across the workspace. View the activity by a particular board or the entire organization.",
    icon: "/recent-act.png",
  },
  {
    id: 6,
    title: "Overview",
    description: "Visualize the status of the board or entire organization.",
    icon: "/statistics.png",
  },
];
