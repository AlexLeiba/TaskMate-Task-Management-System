import { cva } from "class-variance-authority";

export const variantsPublicCardColors = cva("bg-background ", {
  variants: {
    index: {
      1: "bg-chart-2/80",
      2: "bg-chart-3/80",
      3: "bg-chart-4/80",
      4: "bg-chart-5/80",
      5: "bg-tertiary/80",
      6: "bg-chart-1/80",
    },
  },
});
