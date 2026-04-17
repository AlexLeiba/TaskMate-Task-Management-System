import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function SortInticator({
  direction,
}: {
  direction: "asc" | "desc" | "none";
}) {
  return direction === "asc" ? (
    <ArrowUp className="ml-2 h-4 w-4" />
  ) : direction === "desc" ? (
    <ArrowDown className="ml-2 h-4 w-4" />
  ) : (
    <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
  );
}
