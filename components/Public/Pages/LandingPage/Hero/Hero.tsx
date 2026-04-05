import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/consts/links";

import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div
      className="grid lg:grid-cols-[repeat(2,minmax(400px,1fr))] grid-cols-1 gap-4"
      data-test="hero"
    >
      <div className="h-full flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">
            Organize, prioritize and handle your to-dos with ease.
          </h1>
          <p className="text-lg" data-aos="fade-right" data-aos-delay="200">
            Forget about the chaos of your work process. Simplify your
            productivity with TaskMate.
          </p>
        </div>

        <Link
          href={NAV_LINKS.signup.pathname}
          data-aos="fade-right"
          data-test="join-for-free-link"
        >
          <Button
            variant={"tertiary"}
            className="md:max-w-60 z-0 bg-linear-to-t from-orange-900  to-orange-400 hover:to-orange-700 hover:text-white "
          >
            <p className="text-base">Join for free</p>
          </Button>
        </Link>

        <Link
          target="_blank"
          title="Watch how TaskMate was developed"
          href={"/"}
          className="group max-w-72.5"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <Button
            variant={"outline"}
            classNameChildren="w-full underline underline-offset-3 group-hover:underline-offset-8 transition-all group-hover:text-orange-400"
          >
            <div className="flex items-center gap-1">
              Watch how TaskMate was developed.
              <Video className="animate-pulse text-orange-400" />
            </div>
          </Button>
        </Link>
      </div>

      <div className="max-h-[368.28px] w-full">
        <Image
          src="/taskmate-hero.webp"
          alt="hero"
          width={500}
          height={368}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
