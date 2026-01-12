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

export type ListDataType = {
  id: number;
  title: string;
  status: "todo" | "progress" | "review" | "done" | "backlog" | string;
  cards: {
    id: number;
    title: string;
    priority: "low" | "medium" | "high" | "urgent" | "none" | string;
    assignedEmail: string;
    assignedName: string;
  }[];
};
