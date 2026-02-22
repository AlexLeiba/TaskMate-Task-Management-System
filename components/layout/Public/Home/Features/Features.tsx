"use client";
import {
  Slider,
  SliderContent,
  SliderItem,
  useSlider,
} from "@/components/ui/slider";

import Image from "next/image";

import { FeatureCard } from "./FeatureCard";

const PRODUCTIVITY_DATA = [
  {
    id: 1,
    title: "Boards",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds ",
    image: "/features-1.png",
  },
  {
    id: 2,
    title: "Lists",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds .",
    image: "/features-2.png",
  },
  {
    id: 3,
    title: "Cards",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, ",
    image: "/features-3.png",
  },
];
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))]   gap-4">
        <div className="hidden lg:flex flex-col gap-4">
          {PRODUCTIVITY_DATA.map((item, index) => (
            <FeatureCard
              key={item.id}
              data={item}
              handleClick={() => setSliderIndex(index + 1)}
              selected={index + 1 === sliderIndex}
            />
          ))}
        </div>
        {/* find out dynamic the size of marginf out content area */}
        <Slider>
          <SliderContent>
            {PRODUCTIVITY_DATA.map((item) => (
              <SliderItem key={item.id}>
                {/* <div className={cn(`   bg-black rounded-4xl z-50`)}> */}
                <div className="w-screen  h-100 ">
                  <Image
                    src={item.image}
                    width={1000}
                    height={800}
                    alt="Hero-image"
                    className="lg:w-[calc(50vw-((100vw-1152px+48px)/2))] w-[calc(100vw-52px)]   h-full object-cover rounded-md "
                  />
                </div>
                {/* </div> */}
              </SliderItem>
            ))}
          </SliderContent>
        </Slider>
        <div className="lg:hidden flex flex-col gap-4">
          {PRODUCTIVITY_DATA.map((item, index) => (
            <FeatureCard
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
