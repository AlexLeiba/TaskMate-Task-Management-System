import { FILES_MIME_TYPES, IMAGES_MIME_TYPES } from "./consts";

// REUSABLE TYPES
export type ActivityActionType = "created" | "deleted" | "updated";

export type PrioritiesType = "low" | "medium" | "high" | "urgent" | "none";

export type ListStatusType =
  | "todo"
  | "progress"
  | "review"
  | "done"
  | "backlog";

export type UserType = {
  id?: string;
  name: string;
  email: string;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
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
  orgId: string;
  activity: string;
  id: string;
  authorId: string;

  cardId: string | null;
  boardId: string | null;
  createdAt: Date;
  updatedAt: Date;
  type: ActivityActionType;
  author: UserType;
};

export type BoardType = {
  id: string;
  title: string;
  cardImageUrl: string;
  bgImageUrl: string;
  orgId: string;
};

export type CardTicketType = {
  id: string;
  title: string;
  priority: PrioritiesType;
  assignedTo?: AssignedToType;
  assignedToId?: string;
  listName: string;
  listId: string;
  createdAt: number;
  updatedAt: number;
};

export type PriorityType = {
  label: string;
  value: PrioritiesType;
  icon?: React.ReactNode;
};

export type ListDataType = {
  id: string;
  boardId: string;
  orgId: string;
  title: string;
  status: ListStatusType;
  cards: CardTicketType[];
};

export type StatusType = {
  label: string;
  value: "todo" | "progress" | "review" | "done" | "backlog";
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
  cardId: string;
};

export type FileType = ImageMimeType | FileMimeType;

export type AttachmentsType = {
  files: {
    type: FileType; //what type of file has been uploaded
    id: string;
    url: string;
    name?: string;
  }[];
  cardId: string;
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
  assignedTo?: AssignedToType;

  createdAt?: number;
  updatedAt?: number;
  //
  attachments?: AttachmentsType[];
  comments?: CommentsType[];
  activity?: ActivityType[];
  checklist?: ChecklistType[];
  dueDate?: DueDateType;
};

export type ChecklistType = {
  id: string;
  title: string;
  isCompleted: boolean;
  cardId: string;
};

export type DueDateType = {
  id: string;
  date: number;
  time: number;
  cardId: string;
};

export type UnsplashImagesType = {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  title: string;
};

export function isImageMimeType(type: string): type is ImageMimeType {
  return IMAGES_MIME_TYPES.includes(type as ImageMimeType);
}
export function isFileMimeType(type: string): type is ImageMimeType {
  return FILES_MIME_TYPES.includes(type as FileMimeType);
}

// API ROUTES TYPE

export type UploadFileBodyType = {
  file: string;
  cardDetailsId: string;
  boardId: string;
  fileType: "image" | "raw";
  fileName: string;
};

type DeleteSingleFile = {
  type: "single";
  fileId: string;
  fileType: "image" | "raw";
  uploadFileId: string;
  fileName: string;
  cardDetailsId: string;
  boardId: string;
};
type DeleteCardFiles = {
  type: "card";
  cardDetailsId: string;
  fileType: "image" | "raw";
};
type DeleteBoardFiles = {
  type: "board";
  boardId: string;
  fileType: "image" | "raw";
};
type DeleteListFiles = {
  type: "list";
  boardId: string;
  listId: string;
  fileType: "image" | "raw";
};
export type DeleteFileBodyType =
  | DeleteSingleFile
  | DeleteCardFiles
  | DeleteBoardFiles
  | DeleteListFiles;
