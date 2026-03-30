"use client";
import { Spacer } from "@/components/ui/spacer";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import { OVERVIEW_DATA, OVERVIEW_OPTIONS } from "@/lib/consts/public/overview";
import { OverviewCard } from "./OverviewCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useResponsive } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/lib/breakpoints";

export function Overview() {
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const isTablet = useResponsive(BREAKPOINTS.lg);

  useEffect(() => {
    if (!isTablet) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const elements = document.querySelectorAll(".overview-image");

          elements.forEach((el) => {
            el.classList.add("overview-card-image-animation");
          });

          setTimeout(() => {
            elements.forEach((el) => {
              el.classList.remove("overview-card-image-animation");
            });
          }, 10000);
          //
        }
      });
      const intersectedElement = document.querySelector(
        ".overview-cards-container",
      );

      if (intersectedElement) {
        observer.observe(intersectedElement);
      }

      return () => {
        observer.disconnect();
        document
          .querySelector(".overview-image")
          ?.classList.remove("overview-card-image-animation");
      };
    }
  }, [isTablet]);

  function handleSelect(id: number) {
    setSelected((prev) => (prev === id ? null : id));
  }
  return (
    <div>
      <div className="flex flex-col gap-4  w-full">
        <h2 className="text-4xl">Overview Statistics</h2>

        <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] grid-cols-1 gap-2 ">
          {OVERVIEW_OPTIONS.map((option, index) => (
            <div className="flex items-center gap-2 " key={option}>
              <div>
                <CircleCheck
                  size={20}
                  className={cn(
                    selected === index + 1 ? "text-green-500" : "text-gray-500",
                  )}
                />
              </div>
              <p
                className={cn(
                  selected === index + 1 ? "font-medium" : "",
                  "transition-all text-lg",
                )}
              >
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Spacer size={4} />
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          size={"sm"}
          variant={"secondary"}
          title="previous page"
          aria-label="previous page"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          size={"sm"}
          variant={"secondary"}
          disabled={page * itemsPerPage >= OVERVIEW_DATA.length}
          title="next page"
          aria-label="next page"
        >
          <ChevronRight />
        </Button>
      </div>
      <Spacer size={2} />
      <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] grid-cols-1 gap-4 overview-cards-container">
        {OVERVIEW_DATA.slice(
          page === 1 ? 0 : page - 1 * itemsPerPage,
          page === 1 ? itemsPerPage : page * itemsPerPage * 2,
        ).map((data, index) => {
          return (
            <OverviewCard
              index={index + 1}
              key={data.id}
              data={data}
              handleSelect={() => handleSelect(data.id)}
              selected={selected === data.id}
            />
          );
        })}
      </div>
    </div>
  );
}
