import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/consts";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-[repeat(2,minmax(200px,1fr))] gap-4">
        <div className="h-full flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl">
              Capture, organize, and tackle your to-dos from anywhere.
            </h1>
            <p className="text-lg">
              Escape the clutter and chaos—unleash your productivity with
              TaskMate.
            </p>
          </div>

          <Button variant={"tertiary"} className="max-w-60">
            <Link href={NAV_LINKS.signup.pathname}>
              <p className="text-base">Join for free</p>
            </Link>
          </Button>

          <Link
            target="_blank"
            title="Watch how TaskMate was developed"
            href={"/"}
            className="group"
          >
            <div className="flex items-center gap-1 underline underline-offset-3 group-hover:underline-offset-8 transition-all group-hover:text-tertiary">
              Watch how TaskMate was developed.
              <Video />
            </div>
          </Link>
        </div>

        <div>
          <Image
            src="/hero.png"
            alt="hero"
            width={500}
            height={500}
            className="objecty-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
