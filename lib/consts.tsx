import {
  Archive,
  Calendar,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Delete,
  Edit,
  Files,
  Image,
  Pencil,
  Plus,
  Search,
  Upload,
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

/////////////////////////////// LANDING PAGE MOCK DATA

// HEADER
export const HEADER_CARD_TABS_TITLES = [
  { section: "features", label: "Features" },
  { section: "solutions", label: "Solutions" },
  { section: "about", label: "About" },
] as const;

export const HEADER_CARD_TABS_FEATURES: HeaderTabsContentType = {
  features: [
    {
      id: "1",
      icon: <Calendar />,
      title: "Features",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "2",
      icon: <Upload />,
      title: "Edit 1",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "3",
      icon: <Calendar />,
      title: "Edit 2",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "4",
      icon: <Pencil />,
      title: "Edit 3",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "5",
      icon: <Pencil />,
      title: "Edit 4",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "6",
      icon: <Pencil />,
      title: "Edit 5",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
  ],
  solutions: [
    {
      id: "1",
      icon: <Calendar />,
      title: "Solutions",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "2",
      icon: <Check />,
      title: "Edit 1",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "3",
      icon: <Upload />,
      title: "Edit 2",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "4",
      icon: <Pencil />,
      title: "Edit 3",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "5",
      icon: <Pencil />,
      title: "Edit 4",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "6",
      icon: <Pencil />,
      title: "Edit 5",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
  ],
  about: [
    {
      id: "1",
      icon: <Image />,
      title: "About",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "2",
      icon: <Files />,
      title: "Edit",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "3",
      icon: <Calendar />,
      title: "Edit",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "4",
      icon: <Pencil />,
      title: "Edit",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "5",
      icon: <Pencil />,
      title: "Edit",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
    {
      id: "6",
      icon: <Pencil />,
      title: "Edit",
      description:
        "Edit this card Edit this card Edit this card Edit this card Edit this card Edit this card",
      color: "green",
      link: "https://www.google.com",
    },
  ],
};

export const HEADER_SIDEBAR_INFO_TABS: HeaderAdditionalInfoTabsType = {
  features: [
    {
      title: "Features ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
  ],
  solutions: [
    {
      title: "Solutions ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
  ],
  about: [
    {
      title: "About ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
    {
      title: "Lorem ipsum dolor ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi",
    },
  ],
};

export const HEADER_SIDEBAR_INFO_TABS_TITLE = {
  features: "Features",
  solutions: "Solutions",
  about: "About",
};
export const HEADER_TABS_TITLE = {
  features: "Features",
  solutions: "Solutions",
  about: "About",
};

export const HEADER_TABS_LINKS: TabType[] = [
  { label: "Features", value: "features" },
  { label: "Solutions", value: "solutions" },
  { label: "About", value: "about" },
];

// FOOTER
export const FOOTER_TABS_LINKS = [
  {
    label: "About Taskmate",
    description: "About Taskmate About Taskmate About Taskmate",
    path: "/about",
  },
  {
    label: "Features",
    description: "Check out The Features of Taskmate",
    path: "/features",
  },
  {
    label: "Contact us",
    description: "Contact us via Gmail Linkedin or Github",
    path: "/contact",
  },
];
