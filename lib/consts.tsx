import {
  Activity,
  Archive,
  Building2,
  CalendarCog,
  CheckSquare,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  Columns3,
  Copy,
  Delete,
  Edit,
  Globe,
  LayoutDashboard,
  Magnet,
  MonitorCog,
  NotebookPen,
  PackageSearch,
  Palette,
  Plus,
  Search,
  TicketCheck,
  User,
  Wifi,
  WifiHigh,
  WifiLow,
} from "lucide-react";
import {
  HeaderAdditionalInfoTabsType,
  HeaderTabsContentType,
  TabType,
  UnsplashImagesType,
} from "./types";

export const API_REQ_URL = {
  upload: "api/fileupload",
} as const;

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
    id: "none",
    name: "None",
    avatar: "",
    email: "none",
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

export const UNSPLASH_DEFAULT_IMAGES: UnsplashImagesType[] = [
  {
    id: "NIyqowE5aDE",
    urls: {
      small:
        "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "California",
  },
  {
    id: "hwhhfsFgu8M",
    urls: {
      small:
        "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Baltimore",
  },
  {
    id: "fg_FSTo7ejw",
    urls: {
      small:
        "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Orlando, FL",
  },
  {
    id: "5D-5BHyNLt0",
    urls: {
      small:
        "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Brescia (Italy)",
  },
  {
    id: "WJyCRU1m7h8",
    urls: {
      small:
        "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Poland",
  },
  {
    id: "W9OKrxBqiZA",
    urls: {
      small:
        "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "SLC, UT",
  },
  {
    id: "iCoKBp2bZEU",
    urls: {
      small:
        "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "California",
  },
  {
    id: "MHua8zOLanw",
    urls: {
      small:
        "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Salzburg / Austria",
  },
  {
    id: "bKOG83eQNu8",
    urls: {
      small:
        "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Tennessee",
  },
  {
    id: "RJaRebG0a30",
    urls: {
      small:
        "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Santorini, Greece",
  },
];

//////////////////////////////////////////////////// LANDING PAGE MOCK DATA//////////////////////////////////////////////

// HEADER
export const HEADER_CARD_TABS_TITLES = [
  { section: "features", label: "Features" },
  { section: "solutions", label: "Solutions" },
  { section: "about", label: "About" },
  { section: "plans", label: "Plans" },
] as const;

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
      title: "About Taskmate project",
      description: `
Permissions:
Based on user role Admin or User will have certain restrictions.
 User will still be able to read any data within its organization but won't be able to delete: boards, lists, cards and for Card features as: comments , attachments, checklists , dueDate, only assigned Members of the Card and Admin will be able to delete.

Payment system with Stripe:
Will integrate payment system with Stripe, limiting only 5 Boards per organization for free. The payment system will be in development mode. 

Views:
Table view and list view of the board
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

export const HEADER_TABS_LINKS: TabType[] = [
  { label: "Features", value: "features" },
  { label: "Solutions", value: "solutions" },
  { label: "About", value: "about" },
  { label: "Plans", value: "plans" },
];

// FOOTER
export const FOOTER_TABS_LINKS = [
  {
    label: "About Taskmate",
    description: "Learn more about Taskmate project in About section ",
    path: "/",
  },
  {
    label: "Features",
    description: "Check out The Features of Taskmate in the Features section",
    path: "/",
  },
  {
    label: "Contact us",
    description:
      "Contact us via Gmail Linkedin or Github which can be found below",
    path: "/",
  },
];

export type MoreFeaturesCardData = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};
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
    title: "Checklists",
    description:
      "Create checklists for your tasks and projects with TaskMate's checklist feature. Mark tasks as complete and track progress of all your card tickets.",
    icon: <CheckSquare size={50} className="text-chart-2" />,
  },
  {
    id: 3,
    title: "DueDate",
    description:
      "Set due dates for your tasks and projects with TaskMate's due date feature. Keep track of deadlines and prioritize tasks accordingly.",
    icon: <CalendarCog size={50} className="text-chart-3" />,
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Elon Must",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    job: "CEO Tesla and SpaceX",
    logo: "/tesla.png",
    link: "/",
    result:
      "75 % of companies improved sales in the first month using TaskMate",
  },
  {
    id: 2,
    name: "Steve jobs",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    job: "CEO Apple",
    logo: "/apple.png",
    link: "/",
    result:
      "50 % of organizations increased sales in the first year using TaskMate",
  },
  {
    id: 3,
    name: "Bill Gates",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    job: "Software Engineer and CEO of Microsoft",
    logo: "/microsoft.png",
    link: "/",
    result: "90 % of customers accelerated their work process using TaskMate",
  },
  {
    id: 4,
    name: "Elon Must",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    job: "Software Engineer",
    logo: "/tesla.png",
    link: "/",
    result:
      "75 % of companies improved sales in the first month using TaskMate",
  },
  {
    id: 5,
    name: "Bill Gates",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    job: "Software Engineer",
    logo: "/microsoft.png",
    link: "/",
    result: "90 % of customers accelerated their work process using TaskMate",
  },
];

export const PRODUCTIVITY_DATA = [
  {
    id: 1,
    title: "Boards",
    description:
      "Boards can be created or removed from the dashboard and customized with a variety of beautiful background images.",
    image: "/features-1.png",
  },
  {
    id: 2,
    title: "Lists",
    description:
      "The lists support drag-and-drop, title and status editing, and can be duplicated along with all their cards.",
    image: "/features-2.png",
  },
  {
    id: 3,
    title: "Cards",
    description:
      "The Cards support drag-and-drop within the same list or between lists, title editing, copying, descriptions, due dates, checklists, comments, attachments, reporter and member assignment.",
    image: "/features-3.png",
  },
];

/////DATE FORMAT
export const DATE_FORMAT = "MMM d yyyy a HH:mm";
