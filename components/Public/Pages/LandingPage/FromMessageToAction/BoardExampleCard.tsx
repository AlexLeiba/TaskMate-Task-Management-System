import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React from "react";

export function BoardExampleCard() {
  return (
    <div className="grid md:grid-cols-[1fr_2fr]  gap-8 bg-background-element/40 rounded-md md:p-10 p-6    ">
      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-2">
          <LayoutDashboard />
          <p className="text-xl font-medium">BOARD MAGIC</p>
        </div>

        <p className="text-lg">
          Boards can be created or removed from the dashboard and customized
          with a variety of beautiful background images. The board title can be
          modified from the board page. Boards are shared with other members of
          the organization and editable only by admins.
        </p>
      </div>
      <Image
        src={"/org-board.webp"}
        width={400}
        height={200}
        alt="How to get involved in a project by email"
        className="aspect-video w-full rounded-md "
      />
    </div>
  );
}
