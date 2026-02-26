import React from "react";
import { Slider, SliderContent, SliderItem } from "@/components/ui/slider";
import Image from "next/image";
import { TESTIMONIALS_DATA } from "@/lib/consts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Testimonials() {
  return (
    <div>
      <Slider>
        <SliderContent>
          {TESTIMONIALS_DATA.map((item) => (
            <SliderItem key={item.id}>
              {/* <div className={cn(`   bg-black rounded-4xl z-50`)}> */}
              <div className="w-screen  md:h-100  ">
                <div className="lg:w-[calc(100vw-((100vw-1152px+32px)))] w-[calc(100vw-48px)]     rounded-md bg-background-element  h-full">
                  <div className="flex gap-8 h-full md:flex-row flex-col">
                    <div className=" flex flex-col justify-between h-full p-8">
                      <p className="text-xl line-clamp-5">{item.description}</p>

                      <div className="flex flex-col gap-4 ">
                        <Separator className="w-50!" />
                        <div className="flex flex-col">
                          <p>{item.name}</p>
                          <p>{item.job}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <Image
                            src={item.logo}
                            width={100}
                            height={100}
                            alt="company-logo"
                            className="size-10 object-cover"
                          />

                          <Link href={item.link} target="_blank">
                            <Button
                              className="hover:text-tertiary underline underline-offset-2"
                              variant={"link"}
                            >
                              Read the story
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className=" min-w-72 py-8 md:pl-4 pl-8 pr-8 bg-tertiary/50 md:rounded-tr-md md:rounded-bl-none rounded-bl-md rounded-br-md">
                      <p className="text-2xl font-medium">{item.result}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </SliderItem>
          ))}
        </SliderContent>
      </Slider>
    </div>
  );
}
