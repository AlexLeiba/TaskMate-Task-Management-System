import { MailOpen } from "lucide-react";
import Image from "next/image";
import React from "react";

export function EmailExampleCard() {
  return (
    <div className="grid md:grid-cols-[1fr_1fr]  gap-8 bg-background-element/40 rounded-md md:p-10 p-6">
      <Image
        src={"/invitation-email.webp"}
        width={400}
        height={200}
        alt="How to get involved in a project by email"
        className="aspect-video w-full rounded-md h-62.5 object-cover"
      />

      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-2">
          <MailOpen />
          <p className="text-xl font-medium">EMAIL MAGIC</p>
        </div>

        <p className="text-lg">
          Easily turn your invitation email into task management system, just
          accept it and it will forward you to your TaskMate organization
          boards.
        </p>
      </div>
    </div>
  );
}
