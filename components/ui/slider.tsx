"use client";
import React, { Children, createContext, useContext, useState } from "react";
import { IconButton } from "./iconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  handleRight: () => void;
  handleLeft: () => void;
  handleSelect: (id: number) => void;
};

// slider compound component
// Slider will keep the state and pass it to children through context

type SliderContextType = {
  handleRight: () => void;
  handleLeft: () => void;
  sliderIndex: number;
  setSliderIndex: React.Dispatch<React.SetStateAction<number>>;
};
const SliderContext = createContext<SliderContextType>({
  handleRight: () => {},
  handleLeft: () => {},
  sliderIndex: 0,
  setSliderIndex: () => {},
});

export function useSlider() {
  const { handleLeft, handleRight, sliderIndex, setSliderIndex } =
    useContext(SliderContext);

  return { handleLeft, handleRight, sliderIndex, setSliderIndex };
}

type SliderProps = {
  children: React.ReactNode;
  //   handleRight: () => void;
  //   handleLeft: () => void;
  //   handleSelect: (id: number) => void;
};

export function SliderProvider({ children }: SliderProps) {
  const [sliderIndex, setSliderIndex] = useState(1);
  function handleLeft() {
    setSliderIndex((prev) => {
      if (prev === 1) {
        return 3;
      }
      return prev - 1;
    });
  }
  function handleRight() {
    setSliderIndex((prev) => {
      if (prev === 3) {
        return 1;
      }
      return prev + 1;
    });
  }
  return (
    <SliderContext.Provider
      value={{ handleLeft, handleRight, sliderIndex, setSliderIndex }}
    >
      {children}
    </SliderContext.Provider>
  );
}

export function Slider({ children }: SliderProps) {
  const { handleLeft, handleRight, sliderIndex, setSliderIndex } = useSlider();

  return (
    <SliderContext.Provider
      value={{ handleLeft, handleRight, sliderIndex, setSliderIndex }}
    >
      <div className="rounded-md  overflow-hidden">{children}</div>
    </SliderContext.Provider>
  );
}

type SliderItemProps = {
  children: React.ReactNode;
};
export function SliderContent({ children }: SliderItemProps) {
  const childrenCount = Children.count(children);

  const pagination = Array(childrenCount).fill(0);
  const { handleLeft, handleRight, sliderIndex, setSliderIndex } = useSlider();
  return (
    <div className="overflow-x-hidden relative flex-col gap-4">
      {/* PAGINATION */}
      <div className="flex justify-end gap-3 mb-4">
        {pagination.map((_, index) => {
          return (
            <IconButton key={index} onClick={() => setSliderIndex(index + 1)}>
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
        style={{ width: `${sliderIndex * 100}vw` }}
        className="flex justify-end whitespace-nowrap transition-all duration-500 ease-in-out "
      >
        {children}
      </div>

      {/* NAV BUTTONS */}
      <IconButton
        onClick={handleLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2"
        classNameChildren="p-2 bg-black/50 rounded-full flex hover:bg-tertiary "
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="absolute right-2 top-1/2 -translate-y-1/2"
        classNameChildren="p-2 bg-black/50 hover:bg-tertiary rounded-full flex "
        onClick={handleRight}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
}

export function SliderItem({ children }: SliderItemProps) {
  return (
    <div className="min-w-screen bg-black rounded-md overflow-hidden h-100">
      {children}
    </div>
  );
}
