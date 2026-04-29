import { TabType } from "../types";

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

export const HEADER_TABS_LINKS: TabType[] = [
  { label: "Features", value: "features" },
  { label: "Solutions", value: "solutions" },
  { label: "About", value: "about" },
  { label: "Plans", value: "plans" },
] as const;
