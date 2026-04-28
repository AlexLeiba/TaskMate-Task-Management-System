import { PriorityType } from "@/lib/types";

export const CARD_PRIORITIES_CYPRESS: Pick<PriorityType, "value">[] = [
  {
    value: "none",
  },
  {
    value: "urgent",
  },
  {
    value: "high",
  },
  {
    value: "medium",
  },
  {
    value: "low",
  },
] as const;
