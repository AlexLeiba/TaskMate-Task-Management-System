"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  dataLength: number;
};
export function PaginationButton({ dataLength }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams(); //never mutate directly
  const currentPage = searchParams.get("page") || "1";

  function handlePageChange(direction: string) {
    {
      const params = new URLSearchParams(searchParams);

      if (direction === "next") {
        params.set("page", String(Number(currentPage) + 1));
      }
      if (direction === "prev") {
        params.set("page", String(Number(currentPage) - 1));
      }

      router.replace(`?${params.toString()}`);
    }
  }
  return (
    <div className="flex justify-between gap-4">
      <Button
        variant={"secondary"}
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === "1"}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => handlePageChange("next")}
        disabled={Number(currentPage) * 10 >= dataLength}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
