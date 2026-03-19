import { Building2, CalendarCog, CheckSquare } from "lucide-react";

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
    image: "/boards.webp",
  },
  {
    id: 2,
    title: "Lists",
    description:
      "The lists support drag-and-drop, title and status editing, and can be duplicated along with all their cards.",
    image: "/lists.webp",
  },
  {
    id: 3,
    title: "Cards",
    description:
      "The Cards support drag-and-drop within the same list or between lists, title editing, copying, descriptions, due dates, checklists, comments, attachments, reporter and member assignment.",
    image: "/card.webp",
  },
];
