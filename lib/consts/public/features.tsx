import { MoreFeaturesCardData } from "@/lib/types";
import {
  Activity,
  Building2,
  CalendarCog,
  ChartSpline,
  Copy,
  Grip,
  ImagePlus,
  LockOpen,
  MessageCircleCode,
  SlidersHorizontal,
  UserPlus2,
  Wifi,
} from "lucide-react";

export const MORE_FEATURES_CARD_DATA: MoreFeaturesCardData[] = [
  {
    id: 1,
    title: "Organizations",
    description:
      "Organize your tasks and projects with TaskMate's organization feature. Invite collaborators and assign tasks to different teams.",
    icon: <Building2 size={50} className="text-chart-1" />,
  },
  {
    id: 2,
    title: "Role-based management",
    description:
      "Manage tasks and projects with TaskMate's role-based management feature. Assign different roles to members and track their progress.",
    icon: <LockOpen size={50} className="text-chart-3" />,
  },
  {
    id: 3,
    title: "Filters",
    description:
      "Filter your tasks and projects with TaskMate's filter feature. Apply different filters to view specific tasks and projects.",
    icon: <SlidersHorizontal size={50} className="text-chart-2" />,
  },
  {
    id: 4,
    title: "Attachments",
    description:
      "Add attachments to your tasks and projects with TaskMate's attachment feature. Upload files and images, preview images, and download attachments as needed.",
    icon: <ImagePlus size={50} className="text-chart-3" />,
  },
  {
    id: 5,
    title: "Comments",
    description:
      "Comment any card with TaskMate's comments feature. Add comments to cards and track discussions.",
    icon: <MessageCircleCode size={50} className="text-chart-1" />,
  },
  {
    id: 6,
    title: "Due date",
    description:
      "Set due dates for your tasks and projects with TaskMate's due date feature. Keep track of deadlines and prioritize tasks accordingly.",
    icon: <CalendarCog size={50} className="text-chart-2" />,
  },
  {
    id: 7,
    title: "Card and List Copy",
    description:
      "Copy cards and lists with TaskMate's copy feature. Create new cards and lists by copying existing ones with their content.",
    icon: <Copy size={50} className="text-chart-3" />,
  },
  {
    id: 8,
    title: "Assignments",
    description:
      "Assign tasks to members with TaskMate's assignment feature. Assign tasks to different members and track their progress.",
    icon: <UserPlus2 size={50} className="text-chart-1" />,
  },
  {
    id: 9,
    title: "Priority",
    description:
      "Prioritize your tasks and projects with TaskMate's priority feature. Assign different priorities to tasks and projects to keep track of their importance and progress.",
    icon: <Wifi size={50} className="text-chart-2" />,
  },
  {
    id: 10,
    title: "Activity log",
    description:
      "Any action within an Organization is registered under Activity page. Activities can be seen by any member of the Organization under any Card or on the Activity page.",
    icon: <Activity size={50} className="text-chart-3" />,
  },

  {
    id: 12,
    title: "Statistics",
    description:
      "Overview the statistics of your board with TaskMate's statistics feature. Get an overview of the status of your work items, View all work items grouped by status, activity, boards and entire organizations.",
    icon: <ChartSpline size={50} className="text-chart-1" />,
  },
  {
    id: 13,
    title: "Drag and Drop",
    description:
      "Drag and drop your tasks and projects with TaskMate's drag and drop feature. Move cards and lists around the board to create a more organized and efficient workflow.",
    icon: <Grip size={50} className="text-chart-2" />,
  },
];
