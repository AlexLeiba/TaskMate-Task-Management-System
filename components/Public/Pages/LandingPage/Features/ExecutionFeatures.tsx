"use client";
import {
  Slider,
  SliderContent,
  SliderItem,
  useSlider,
} from "@/components/ui/slider";

import { FeatureCard } from "./FeatureCard";
import { EXECUTION_TOOLS_DATA } from "@/lib/consts/public/body";
import { ImageFeature } from "./ImageFeature";

export function ExecutionFeatures() {
  const { setSliderIndex, sliderIndex } = useSlider();
  return (
    <div className=" flex flex-col gap-8 " data-test="execution-features">
      <div className="flex justify-end">
        <div className="lg:w-1/2 flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl">Your task management helpers</h2>
            <p className="text-lg" data-aos="fade-right" data-aos-delay="500">
              Manage your tasks efficiently .
            </p>
          </div>
        </div>
      </div>
      {/* grid-cols-1 */}
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
        <Slider>
          <SliderContent withNavigationButtons={false}>
            {EXECUTION_TOOLS_DATA.map((item) => (
              <SliderItem key={item.id}>
                <div className="w-screen  h-full ">
                  <ImageFeature
                    previewImage={item.previewImage}
                    image={item.image}
                    description={item.description}
                    title={item.title}
                  />
                </div>
              </SliderItem>
            ))}
          </SliderContent>
        </Slider>
        <div className="hidden lg:flex flex-col gap-4">
          {EXECUTION_TOOLS_DATA.map((item, index) => (
            <div data-aos="fade-up" data-aos-delay={index * 100} key={item.id}>
              <FeatureCard
                data={item}
                handleClick={() => setSliderIndex(index + 1)}
                selected={index + 1 === sliderIndex}
                index={(index + 1) as unknown as 1 | 2 | 3 | 4 | 5}
              />
            </div>
          ))}
        </div>
        <div className="lg:hidden flex flex-col gap-4">
          {EXECUTION_TOOLS_DATA.map((item, index) => (
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
