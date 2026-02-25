"use client";
import React, { Children, createContext, useContext, useState } from "react";
import { IconButton } from "./iconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SliderContextType = {
  sliderIndex: number;
  setSliderIndex: React.Dispatch<React.SetStateAction<number>>;
};
const SliderContext = createContext<SliderContextType>({
  sliderIndex: 0,
  setSliderIndex: () => {},
});

export function useSlider() {
  const { sliderIndex, setSliderIndex } = useContext(SliderContext);

  return { sliderIndex, setSliderIndex };
}

type SliderProps = {
  children: React.ReactNode;
};

export function SliderProvider({ children }: SliderProps) {
  const [sliderIndex, setSliderIndex] = useState(1);

  return (
    <SliderContext.Provider value={{ sliderIndex, setSliderIndex }}>
      {children}
    </SliderContext.Provider>
  );
}

export function Slider({ children }: SliderProps) {
  const { sliderIndex, setSliderIndex } = useSlider();

  return (
    <SliderContext.Provider value={{ sliderIndex, setSliderIndex }}>
      <div className="overflow-hidden">{children}</div>
    </SliderContext.Provider>
  );
}

type SliderItemProps = {
  children: React.ReactNode;
  withNavigationButtons?: boolean;
};
export function SliderContent({
  children,
  withNavigationButtons = true,
}: SliderItemProps) {
  const childrenCount = Children.count(children);

  const pagination = Array(childrenCount).fill(0);
  const { sliderIndex, setSliderIndex } = useSlider();

  function handleLeft() {
    setSliderIndex((prev) => {
      if (prev === 1) {
        return childrenCount;
      }
      return prev - 1;
    });
  }
  function handleRight() {
    setSliderIndex((prev) => {
      if (prev === childrenCount) {
        return 1;
      }

      return prev + 1;
    });
  }
  return (
    <div className=" relative flex flex-col  gap-2">
      {/* PAGINATION */}
      <div className="flex justify-end gap-3 mb-4">
        {pagination.map((_, index) => {
          return (
            <IconButton
              aria-label={`slide-${index + 1}`}
              title={`slide-${index + 1}`}
              key={index}
              onClick={() => setSliderIndex(index + 1)}
            >
              <div
                style={{ width: sliderIndex === index + 1 ? "50px" : "8px" }}
                className={cn(
                  sliderIndex === index + 1
                    ? "bg-muted-foreground"
                    : " bg-white ",
                  "h-2 rounded-full transition-all",
                )}
              />
            </IconButton>
          );
        })}
      </div>

      {/* CONTENT */}
      <div
        style={{ transform: `translateX(-${(sliderIndex - 1) * 100}vw)` }}
        className="flex flex-row transition-all duration-500 ease-in-out "
      >
        {children}
      </div>

      {withNavigationButtons && (
        <>
          {/* NAV BUTTONS */}
          <IconButton
            title="Previous"
            aria-label="Previous"
            onClick={handleLeft}
            className="absolute left-2 top-1/2 -translate-y-[calc(50%-24px)] "
            classNameChildren="p-2 bg-black/50 rounded-full flex hover:bg-tertiary "
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            aria-label="Next"
            title="Next"
            className="absolute right-2 top-1/2 -translate-y-[calc(50%-24px)] "
            classNameChildren="p-2 bg-black/50 hover:bg-tertiary rounded-full flex "
            onClick={handleRight}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </div>
  );
}

export function SliderItem({ children }: SliderItemProps) {
  return <div className="w-screen rounded-md ">{children}</div>;
}
