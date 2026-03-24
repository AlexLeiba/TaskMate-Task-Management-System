import { TaskOrganizationType } from "@/lib/types";
import {
  BookCheck,
  CheckSquare,
  Columns4,
  FileUp,
  LayoutDashboard,
  Pencil,
} from "lucide-react";

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

export const ORGANIZATION_TOOLS_DATA: TaskOrganizationType[] = [
  {
    id: 1,
    title: "Boards",
    description:
      "The Boards are the main private organizational unit of TaskMate. Boards are visible only to invited members of the Organization. Boards can be created or removed from the dashboard only by Admin and customized with a variety of beautiful background images.",
    image: "/test7.png",
    previewImage: "/board.png",
    icon: <LayoutDashboard size={30} className="text-chart-2" />,
  },
  {
    id: 2,
    title: "Lists",
    description:
      "The lists are board columns that contain ticket cards. They can be created and duplicated along with their cards, have editable titles and statuses, support drag-and-drop, and can be filtered within the board. ",
    image: "/l4.png",
    icon: <Columns4 size={30} className="text-chart-3" />,
    previewImage: "/list2.png",
  },
  {
    id: 3,
    title: "Card Details",
    description:
      "The cards are the tickets created within lists. They support drag-and-drop within the same list or across lists, filters within the board, title editing, card duplication, rich-text descriptions, due date time picker, checklists, comments, attachments, priority settings, reporter and member assignment.",
    image: "/c1.png",
    icon: <BookCheck size={30} className="text-chart-4" />,
    previewImage: "/details2.png",
  },
];
export const EXECUTION_TOOLS_DATA = [
  {
    id: 1,
    title: "Checklist",
    description:
      "Create checklists for your tasks and projects with TaskMate's checklist feature. Mark tasks as complete and visualize and track progress by predefined colors and percentage completion.",
    image: "/check10.png",
    icon: <CheckSquare size={30} className="text-chart-2" />,
    previewImage: "/checklist-last.png",
  },
  {
    id: 2,
    title: "Attachments",
    description:
      "Add attachments to your tasks and projects with TaskMate's attachment feature. Upload files and images, preview images, and download attachments as needed.",
    image: "/upload.png",
    icon: <FileUp size={30} className="text-chart-3" />,
    previewImage: "/attachments-last.png",
  },
  {
    id: 3,
    title: "Rich text editor",
    description:
      "Create or update descriptions for your tasks and projects with TaskMate's description feature. Add more details or notes to your tasks and projects using a rich text editor, which allows to format text, add images, links, and more.",
    image: "/desc10.png",
    icon: <Pencil size={30} className="text-chart-4" />,
    previewImage: "/description-last.png",
  },
];
