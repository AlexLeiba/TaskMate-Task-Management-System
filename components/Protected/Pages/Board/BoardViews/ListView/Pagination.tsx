import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  pageCount: number;
  pageIndex: number;
  disabledPrevious?: boolean;
  disabledNext?: boolean;
  onChangePage: (direction: "next" | "previous") => void;
};
export function Pagination({
  pageCount,
  pageIndex,
  disabledPrevious,
  disabledNext,
  onChangePage,
}: Props) {
  return (
    <>
      <div className="text-sm flex items-center gap-1 bg-background h-6 px-2 rounded-md">
        Page: <p>{pageIndex}</p>/<p>{pageCount}</p>
      </div>

      <Button
        aria-label="Previous page"
        title="Previous page"
        className="h-6"
        variant="secondary"
        size="sm"
        onClick={() => onChangePage("previous")}
        disabled={disabledPrevious}
      >
        <ChevronLeft />
      </Button>
      <Button
        aria-label="Next page"
        title="Next page"
        className="h-6"
        variant="secondary"
        size="sm"
        onClick={() => onChangePage("next")}
        disabled={disabledNext}
      >
        <ChevronRight />
      </Button>
    </>
  );
}
