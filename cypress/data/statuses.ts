import { ListStatusesOptionType } from "@/lib/types";

export const LIST_STATUSES_CYPRESS: Pick<ListStatusesOptionType, "value">[] = [
  {
    value: "todo",
  },
  {
    value: "progress",
  },
  {
    value: "review",
  },
  {
    value: "done",
  },
  {
    value: "backlog",
  },
] as const;
