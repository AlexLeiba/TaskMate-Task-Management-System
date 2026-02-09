import { cva } from "class-variance-authority";

export const checklistStatusColors = cva("", {
  variants: {
    status: {
      true: "bg-green-600",
      false: "bg-yellow-600",
    },
  },
});
