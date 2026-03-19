import {
  Activity,
  Building2,
  Columns3,
  Globe,
  LayoutDashboard,
  Magnet,
  MonitorCog,
  NotebookPen,
  PackageSearch,
  Palette,
  TicketCheck,
  User,
} from "lucide-react";

import {
  HeaderAdditionalInfoTabsType,
  HeaderTabsContentType,
} from "@/lib/types";

export const HEADER_CARD_TABS_FEATURES: HeaderTabsContentType = {
  features: [
    {
      id: "6",
      icon: <User />,
      title: "Workspace Management",
      description:
        "Admin can manage the organization: create or delete it, update its name, logo, and avatar, invite or remove users and change member roles, all can be done from settings page.",
      color: "",
      link: "/",
    },
    {
      id: "1",
      icon: <Building2 />,
      title: "Organizations",
      description:
        "An organization is a shared workspace where invited members access boards and manage tasks, typically overseen by an admin.",
      color: "",
      link: "/",
    },
    {
      id: "2",
      icon: <Activity />,
      title: "Activity",
      description:
        "Any action done by a member within an Organization is registered under activity page. Activities can be seen by any member of the organization under any ticket Card or in the activity page.",
      color: "",
      link: "/",
    },
    {
      id: "3",
      icon: <LayoutDashboard />,
      title: "Boards",
      description:
        "Boards can be created or removed from the dashboard and customized with a variety of beautiful background images. The board title can be modified from the board page. Boards are shared with other members of the organization.",
      color: "",
      link: "/",
    },
    {
      id: "4",
      icon: <Columns3 />,
      title: "List",
      description:
        "Lists are board columns that hold ticket Cards. They support drag-and-drop, title and status editing, and can be duplicated along with all their cards.",
      color: "",
      link: "/",
    },
    {
      id: "5",
      icon: <TicketCheck />,
      title: "Card",
      description:
        "Cards are tickets created within lists. They support drag-and-drop within the same list or between lists, title editing, copying, descriptions, due dates, checklists, comments, attachments, reporter and member assignment.",
      color: "",
      link: "/",
    },
  ],
  solutions: [
    {
      id: "1",
      icon: <PackageSearch />,
      title: "Product management",
      description:
        "Use TaskMate`s management boards and other useful features to simplify complex projects and processes.",
      color: "",
      link: "/",
    },
    {
      id: "2",
      icon: <Magnet />,
      title: "Marketing",
      description:
        "Whether launching a new product, campaign, or creating content, TaskMate helps marketing teams succeed.",
      color: "",
      link: "/",
    },
    {
      id: "3",
      icon: <MonitorCog />,
      title: "Engineering teams",
      description:
        "Ship more code, faster, and give your developers the freedom to be more agile with TaskMate.",
      color: "",
      link: "/",
    },
    {
      id: "5",
      icon: <NotebookPen />,
      title: "Startups",
      description:
        "From hitting revenue goals to managing workflows, small businesses thrive with TaskMate.",
      color: "",
      link: "/",
    },
    {
      id: "4",
      icon: <Palette />,
      title: "Design teams",
      description:
        "Empower your design teams by using TaskMate to streamline creative requests and promote more fluid cross-team collaboration.",
      color: "",
      link: "/",
    },

    {
      id: "6",
      icon: <Globe />,
      title: "Remote teams",
      description:
        "From hitting revenue goals to managing workflows, small businesses thrive with TaskMate.",
      color: "",
      link: "/",
    },
  ],
  about: [
    {
      id: "1",
      title: "About Taskmate project",
      description: `Taskmate is a task management system designed and developed by Alex Leiba Lapteacru, a front-end developer with experience in back-end development.

The goal of the project was to create a simple, intuitive, and user-friendly task management platform that includes the most useful features inspired by tools like Trello, Jira, and other Kanban-based systems.

The application was built using modern and reliable technologies, including Next.js, TypeScript, Tailwind CSS, Prisma, and several other supporting tools.

Since the project was developed for personal use, learning purposes, and as part of a professional portfolio, some elements of the design and landing page content were inspired by Trello.`,
      icon: <></>,
      link: "",
      color: "",
    },
  ],
  plans: [
    {
      id: "1",
      title: "Our Future plans",
      description: `
Permissions:
Based on user role Admin or Member will have certain restrictions.
User will still be able to read any data within its organization but won't be able to delete: boards, lists, cards and for Card features as: comments , attachments, checklists , due date, only assigned Members of the Card and Admin will be able to delete.

Payment system with Stripe:
Will integrate payment system with Stripe, limiting only 5 Boards per organization for free. The payment system will be only in development mode. 

Views:
Table view and list view of the board

Sortings:
Cards will be sorted by assigned, unassigned, all.

Visualization:
Will have a visualization per board and per organization with Bar chart and Pie chart.
`,
      icon: <></>,
      link: "",
      color: "",
    },
  ],
};

export const HEADER_SIDEBAR_INFO_TABS: HeaderAdditionalInfoTabsType = {
  features: [
    {
      title: "Use case: Workspace Management",
      description:
        "Handle invitations,permissions and other tasks from a single place.",
    },
    {
      title: "Use case: Organizations",
      description: "Separate workspaces with different teams and projects.",
    },
    {
      title: "Use case: Activity",
      description:
        "Be aware of all the activities happening in your organization.",
    },
    {
      title: "Use case: Boards",
      description:
        "Separate boards per project to keep tasks and activities organized.",
    },
  ],
  solutions: [
    {
      title: "Use case: Project management",
      description:
        "Keep projects organized, centralized, deadlines on track, and teammates aligned with TaskMate.",
    },
    {
      title: "Use case: Task management",
      description:
        "Track progress of tasks in one convenient place with a visual layout that adds 'magic' to your to-do`s.",
    },
  ],
  about: [
    {
      title: "Developers",
      description:
        "Alex Leiba Lapteacru - Front-end developer with experience in back-end development.",
    },
    {
      title: "The Goal",
      description:
        "The goal of the project was to create a simple, intuitive, and user-friendly task management platform that includes the most useful features inspired by tools like Trello, Jira, and other Kanban-based systems.",
    },
    {
      title: "Technologies used",
      description:
        "The application was built using modern and reliable technologies, including Next.js, TypeScript, Tailwind CSS, Prisma, and several other supporting tools.",
    },
  ],
  plans: [
    {
      title: "Permissions",
      description:
        "Users won't be able to delete: boards, lists, cards and for Card features as: comments , attachments, checklists , dueDate, only assigned Members of the Card  and Admin will be able to delete.",
    },
    {
      title: "Views",
      description: "Table view and list view of the board.",
    },
    {
      title: "Payment system",
      description:
        "Will integrate payment system with Stripe, limiting only 5 Boards per organization for free. The payment system will be in development mode. ",
    },
  ],
};

export const HEADER_SIDEBAR_INFO_TABS_TITLE = {
  features: "Features",
  solutions: "Solutions",
  about: "About",
  plans: "Plans",
};
export const HEADER_TABS_TITLE = {
  features: "Features",
  solutions: "Solutions",
  about: "About",
  plans: "Plans",
};

export const HEADER_CARD_TABS_TITLES = [
  { section: "features", label: "Features" },
  { section: "solutions", label: "Solutions" },
  { section: "about", label: "About" },
  { section: "plans", label: "Plans" },
] as const;
