import { cva } from "class-variance-authority";

export const variantsTabCardColors = cva("bg-background ", {
  variants: {
    index: {
      0: "hover:bg-tertiary/50",
      1: "hover:bg-chart-1/50",
      2: "hover:bg-chart-2/50",
      3: "hover:bg-chart-3/50",
      4: "hover:bg-chart-4/50",
      5: "hover:bg-chart-5/50",
    },
  },
});
