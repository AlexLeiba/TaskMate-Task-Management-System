"use client";
import {
  Slider,
  SliderContent,
  SliderItem,
  SliderProvider,
  useSlider,
} from "@/components/ui/slider";
import { NAV_LINKS } from "@/lib/consts";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCard } from "./FeatureCard";
const PRODUCTIVITY_DATA = [
  {
    id: 1,
    title: "Boards",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds ",
  },
  {
    id: 2,
    title: "Lists",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds .",
  },
  {
    id: 3,
    title: "Cards",
    description:
      "Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, ",
  },
];
export function Features() {
  const { setSliderIndex, sliderIndex } = useSlider();
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div className="w-1/2 flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl"> Your productivity powerhouse</h2>
          <p className="text-lg">
            Stay organized and efficient with Inbox, Boards, and Planner. Every
            to-do, idea, or responsibility—no matter how small—finds its place,
            keeping you at the top of your game.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="  flex flex-col gap-4">
          {PRODUCTIVITY_DATA.map((item, index) => (
            <FeatureCard
              key={item.id}
              data={item}
              handleClick={() => setSliderIndex(index + 1)}
              selected={index + 1 === sliderIndex}
            />
          ))}
        </div>

        <Slider>
          <SliderContent>
            {PRODUCTIVITY_DATA.map((item) => (
              <SliderItem key={item.id}>
                <Image
                  src={"/what-is-trello-2-1.webp"}
                  width={1300}
                  height={600}
                  alt="Hero-image"
                  className="w-full h-100 object-cover"
                />
              </SliderItem>
            ))}
          </SliderContent>
        </Slider>
      </div>
    </div>
  );
}
