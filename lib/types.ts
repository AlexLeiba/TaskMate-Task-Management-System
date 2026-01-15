export type ActivityType = {
  id: number;
  imageUrl: string;
  name: string;
  email: string;
  createdAt: number;
  activity: string;
  boardName: string;
  activityType: string;
};

export type BoardType = {
  id: string;
  title: string;
  imageUrl: string;
};

export type CardTicketType = {
  id: number;
  title: string;
  priority: "low" | "medium" | "high" | "urgent" | "none" | string;
  assignedTo: AssignedToType;
  listName: string;
  listId: string;
};

export type PriorityType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type UserType = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export type ListDataType = {
  id: number;
  title: string;
  status: "todo" | "progress" | "review" | "done" | "backlog" | string;
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

export type PrioritiesType =
  | "low"
  | "medium"
  | "high"
  | "urgent"
  | "none"
  | string;

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
  attachments?: string[];
  comments?: string[];
  activity?: ActivityType[];
};
