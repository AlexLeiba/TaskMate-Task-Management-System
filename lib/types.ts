import { FILES_MIME_TYPES, IMAGES_MIME_TYPES } from "./consts";

// REUSABLE TYPES
export type ActivityActionType =
  | "Created"
  | "Deleted"
  | "Updated"
  | "Added"
  | "Removed";

export type PrioritiesType =
  | "low"
  | "medium"
  | "high"
  | "urgent"
  | "none"
  | string;

export type ListStatusType =
  | "todo"
  | "progress"
  | "review"
  | "done"
  | "backlog"
  | string;

export type UserType = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export type ImageMimeType = (typeof IMAGES_MIME_TYPES)[number];
export type FileMimeType = (typeof FILES_MIME_TYPES)[number];

export type UploadedFileType = {
  id: string;
  name?: string;
  url: string;
};

/////////////////////////////////////////////////

export type ActivityType = {
  id: string;
  createdAt: number;
  activity: string; //act message
  boardName: string; //in which board
  listName: string; //in which list
  boardId: string;
  listId: string;
  activityType: ActivityActionType;
  author: UserType;
};

export type BoardType = {
  id: string;
  title: string;
  imageUrl: string;
};

export type CardTicketType = {
  id: number;
  title: string;
  priority: PrioritiesType;
  assignedTo: AssignedToType;
  listName: string;
  listId: string;
  createdAt: number;
  updatedAt: number;
};

export type PriorityType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type ListDataType = {
  id: number;
  title: string;
  status: ListStatusType;
  cards: CardTicketType[];
};

export type StatusType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type ReporterType = {
  email: string;
  name: string;
  avatar: string;
};
export type AssignedToType = {
  email: string;
  name: string;
  avatar: string;
};

export type CommentsType = {
  id: string;
  createdAt: number;
  comment: string;
  author: UserType; //who commented
};

export type FileType = ImageMimeType | FileMimeType;

export type AttachmentsType = {
  files: {
    type: FileType; //what type of file has been uploaded
    id: string;
    url: string;
    name?: string;
  }[];

  createdAt: number;
  author: UserType; //who have added attach
};
export type CardDetailsType = {
  listName?: string;
  listId?: string;
  id: string;
  title: string;
  description: string;
  priority: PrioritiesType;
  reporter?: ReporterType;
  assignedTo?: AssignedToType[];

  createdAt?: number;
  updatedAt?: number;
  //
  attachments?: AttachmentsType[];
  comments?: CommentsType[];
  activity?: ActivityType[];
};

export type ChecklistType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function isImageMimeType(type: string): type is ImageMimeType {
  return IMAGES_MIME_TYPES.includes(type as ImageMimeType);
}
export function isFileMimeType(type: string): type is ImageMimeType {
  return FILES_MIME_TYPES.includes(type as FileMimeType);
}
