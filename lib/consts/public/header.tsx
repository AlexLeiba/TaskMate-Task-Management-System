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
      id: "1",
      icon: <Building2 />,
      title: "Organization",
      description:
        "Organization is the main private unit of TaskMate which is accessible only to invited members.  Any Organization can be created, removed, edited (logo and name) by only Admins.",
      color: "",
      link: "#all-features",
    },
    {
      id: "3",
      icon: <LayoutDashboard />,
      title: "Boards",
      description:
        "The Boards are the main workspace of any Organization. Boards allow to separate different projects and tasks within the same Organization and members. Boards can be created or removed from the dashboard only by Admin and customized with a variety of beautiful background images.",
      color: "",
      link: "#all-features",
    },
    {
      id: "6",
      icon: <User />,
      title: "Workspace Management",
      description:
        "Manage tasks and projects with TaskMate's role-based  management feature. Create lists and cards, set due dates, create checklists,  invite, delete, assign tasks or different roles to members and track their progress.",
      color: "",
      link: "#all-features",
    },
    {
      id: "4",
      icon: <Columns3 />,
      title: "List",
      description:
        "The lists are board columns that contain ticket cards. They can be created and duplicated along with their cards, have editable titles and statuses, support drag-and-drop, and can be filtered within the board.",
      color: "",
      link: "#all-features",
    },
    {
      id: "5",
      icon: <TicketCheck />,
      title: "Card",
      description:
        "The cards are the tickets created within lists. They support drag-and-drop within the same list or across lists, filters within the board, title editing, card duplication, rich-text descriptions, due date time picker, checklists, comments, attachments, priority settings, reporter and member assignment.",
      color: "",
      link: "#all-features",
    },

    {
      id: "2",
      icon: <Activity />,
      title: "Activity",
      description:
        "Any action within an Organization is registered and can be seen on any ticket Card, Overview Board or on the Activity page. This helps to avoid losing track of the history of the Organization.",
      color: "",
      link: "#all-features",
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
      link: "#all-features",
    },
    {
      id: "2",
      icon: <Magnet />,
      title: "Marketing",
      description:
        "Whether launching a new product, campaign, or creating content, TaskMate helps marketing teams succeed.",
      color: "",
      link: "#all-features",
    },
    {
      id: "3",
      icon: <MonitorCog />,
      title: "Engineering teams",
      description:
        "Ship more code, faster, and give your developers the freedom to be more agile with TaskMate.",
      color: "",
      link: "#all-features",
    },
    {
      id: "5",
      icon: <NotebookPen />,
      title: "Startups",
      description:
        "From hitting revenue goals to managing workflows, small businesses thrive with TaskMate.",
      color: "",
      link: "#all-features",
    },
    {
      id: "4",
      icon: <Palette />,
      title: "Design teams",
      description:
        "Empower your design teams by using TaskMate to streamline creative requests and promote more fluid cross-team collaboration.",
      color: "",
      link: "#all-features",
    },

    {
      id: "6",
      icon: <Globe />,
      title: "Remote teams",
      description:
        "From hitting revenue goals to managing workflows, small businesses thrive with TaskMate.",
      color: "",
      link: "#all-features",
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
Plans with Payment system Stripe:
-Will integrate Plans with Stripe, limiting only 5 Boards per organization for free.
-Plans will be: Free, Basic, Premium.
-Dedicated page for all available Plans.
-Dedicated page for all payment history.

Views:
-Table view of all boards.
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
      title: "Payment system",
      description:
        "Will integrate payment system with Stripe, limiting only 5 Boards per organization for free.",
    },
    {
      title: "Views",
      description: "Table view of all boards.",
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
