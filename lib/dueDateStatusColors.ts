import { cva } from "class-variance-authority";

export const duedateStatusColors = cva("", {
  variants: {
    status: {
      expired: "bg-red-800",
      today: "bg-yellow-700",
      future: "bg-gray-800",
    },
  },
});
