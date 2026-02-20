import { IconButton } from "@/components/ui/iconButton";
import { Separator } from "@/components/ui/separator";
import {
  HEADER_SIDEBAR_INFO_TABS,
  HEADER_SIDEBAR_INFO_TABS_TITLE,
} from "@/lib/consts";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "features" | "solutions" | "about";
};
export function SideTabsContent({ type }: Props) {
  return (
    <div className="bg-tertiary/20 w-full h-full px-4 py-2">
      <p className="text-xl">{HEADER_SIDEBAR_INFO_TABS_TITLE[type]}</p>
      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        {HEADER_SIDEBAR_INFO_TABS[type].map((item, index) => (
          <div key={index} className="flex flex-col gap-2 ">
            <p className="text-lg">{item.title}</p>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      <Link
        href={"/"}
        title="All use cases"
        aria-label="All use cases"
        className="flex"
      >
        <IconButton classNameChildren="flex items-center gap-2 pt-2 group">
          <p>See all use cases </p>

          <ChevronRight className="text-tertiary group-hover:translate-x-2 transition-all" />
        </IconButton>
      </Link>
    </div>
  );
}
