import { MoreFeaturesCardData } from "@/lib/types";
import {
  Activity,
  Building2,
  CalendarCog,
  ChartSpline,
  Columns,
  Copy,
  Grip,
  ImagePlus,
  LockOpen,
  MessageCircleCode,
  SlidersHorizontal,
  Table,
  UserPlus2,
  Wallet,
  Wifi,
} from "lucide-react";

export const MORE_FEATURES_CARD_DATA: MoreFeaturesCardData[] = [
  {
    id: 1,
    title: "Recurring subscriptions",
    description:
      "Reliable payment system with Stripe for recurring subscriptions and Plans. Payment system offers seamless and secure checkout process, cancel subscriptions, invoice history, invoice downloads and more.",
    icon: <Wallet size={50} className="text-chart-3" />,
  },
  {
    id: 2,
    title: "Organizations",
    description:
      "A private environment for invited members or owned Organizations where you can invite other members and manage their permissions within the Organization.",
    icon: <Building2 size={50} className="text-chart-1" />,
  },
  {
    id: 3,
    title: "Role-based management",
    description:
      "Manage invited member's role within the organization, this will prevent other members from deleting work items or from editing unnasigned to them work items.",
    icon: <LockOpen size={50} className="text-chart-3" />,
  },
  {
    id: 4,
    title: "Statistics",
    description:
      "Overview the statistics of your board with TaskMate's statistics feature. Get an overview of the status of your work items, View all work items grouped by status, activity, boards and entire organizations.",
    icon: <ChartSpline size={50} className="text-chart-1" />,
  },
  {
    id: 5,
    title: "Kanban view",
    description:
      "Fully interactive kanban board with drag and drop functionality of all elements. Kanban view helps to visualize and prioritize tasks and projects in a more intuitive way, making it easier to manage and track workloads.",
    icon: <Columns size={50} className="text-chart-2" />,
  },
  {
    id: 6,
    title: "Table view",
    description:
      "Fully functional and interactive Table view with multiple filter methods and interactive table cells which allows to interact, visualize, sort and take decisions much faster when dealing with multiple work items.",
    icon: <Table size={50} className="text-chart-2" />,
  },
  {
    id: 7,
    title: "Drag and Drop",
    description:
      "Drag and drop your tasks and projects with TaskMate's drag and drop feature. Move cards and lists around the board to create a more organized and efficient workflow.",
    icon: <Grip size={50} className="text-chart-3" />,
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
    title: "Filters",
    description:
      "Filter your tasks and projects with TaskMate's filter feature. Apply different filters to view specific tasks and projects.",
    icon: <SlidersHorizontal size={50} className="text-chart-2" />,
  },
  {
    id: 11,
    title: "Attachments",
    description:
      "Add attachments to your tasks and projects with TaskMate's attachment feature. Upload files and images, preview images, and download attachments as needed.",
    icon: <ImagePlus size={50} className="text-chart-3" />,
  },
  {
    id: 12,
    title: "Comments",
    description:
      "Comment any card with TaskMate's comments feature. Add comments to cards and track discussions.",
    icon: <MessageCircleCode size={50} className="text-chart-1" />,
  },
  {
    id: 13,
    title: "Due date",
    description:
      "Set due dates for your tasks and projects with TaskMate's due date feature. Keep track of deadlines and prioritize tasks accordingly.",
    icon: <CalendarCog size={50} className="text-chart-2" />,
  },
  {
    id: 14,
    title: "Card and List Copy",
    description:
      "Copy cards and lists with TaskMate's copy feature. Create new cards and lists by copying existing ones with their content.",
    icon: <Copy size={50} className="text-chart-3" />,
  },

  {
    id: 15,
    title: "Activity log",
    description:
      "Any action within an Organization is registered under Activity page. Activities can be seen by any member of the Organization under any Card or on the Activity page.",
    icon: <Activity size={50} className="text-chart-3" />,
  },
];
