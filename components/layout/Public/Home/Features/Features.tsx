"use client";
import {
  Slider,
  SliderContent,
  SliderItem,
  useSlider,
} from "@/components/ui/slider";

import Image from "next/image";

import { FeatureCard } from "./FeatureCard";
import { PRODUCTIVITY_DATA } from "@/lib/consts";

export function Features() {
  const { setSliderIndex, sliderIndex } = useSlider();
  return (
    <div className=" flex flex-col gap-8">
      <div className="lg:w-1/2 flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl"> Your productivity powerhouse</h2>
          <p className="text-lg">
            Stay organized and efficient with Inbox, Boards, and Planner. Every
            to-do, idea, or responsibility—no matter how small—finds its place,
            keeping you at the top of your game.
          </p>
        </div>
      </div>
      {/* grid-cols-1 */}
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
        <div className="hidden lg:flex flex-col gap-4">
          {PRODUCTIVITY_DATA.map((item, index) => (
            <FeatureCard
              key={item.id}
              data={item}
              handleClick={() => setSliderIndex(index + 1)}
              selected={index + 1 === sliderIndex}
              index={(index + 1) as unknown as 1 | 2 | 3 | 4 | 5}
            />
          ))}
        </div>

        <Slider>
          <SliderContent withNavigationButtons={false}>
            {PRODUCTIVITY_DATA.map((item) => (
              <SliderItem key={item.id}>
                <div className="w-screen  h-75 ">
                  <Image
                    src={item.image}
                    width={1000}
                    height={800}
                    alt="Hero-image"
                    className="lg:w-[calc(50vw-((100vw-1152px+48px)/2))] w-[calc(100vw-48px)]   h-full object-cover rounded-md "
                  />
                </div>
              </SliderItem>
            ))}
          </SliderContent>
        </Slider>
        <div className="lg:hidden flex flex-col gap-4">
          {PRODUCTIVITY_DATA.map((item, index) => (
            <FeatureCard
              index={(index + 1) as unknown as 1 | 2 | 3 | 4 | 5}
              key={item.id}
              data={item}
              handleClick={() => setSliderIndex(index + 1)}
              selected={index + 1 === sliderIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
