import { cva } from "class-variance-authority";

export const variantsPublicCardColors = cva("bg-background ", {
  variants: {
    index: {
      1: "bg-chart-2/50",
      2: "bg-chart-3/50",
      3: "bg-chart-4/50",
      4: "bg-chart-5/50",
      5: "bg-tertiary/50",
      6: "bg-chart-1/50",
    },
  },
});
