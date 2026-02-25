import { Grid } from "lucide-react";
import Image from "next/image";
import React from "react";

export function BoardExampleCard() {
  return (
    <div className="grid md:grid-cols-[1fr_2fr]  gap-8 bg-background-element/90 rounded-md md:p-10 p-6 absolute md:top-[calc(100%-100px)]    top-[calc(100%-180px)] ">
      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-2">
          <Grid />
          <p className="text-xl font-medium">BOARD MAGIC</p>
        </div>

        <p className="text-lg">
          Need to follow up on a message from Slack or Microsoft Teams? Send it
          directly to your Trello board! Your favorite app interface lets you
          save messages that appear in your Trello Inbox with AI-generated
          summaries and links.
        </p>
      </div>
      <Image
        src={"/features-1.png"}
        width={400}
        height={200}
        alt="How to get involved in a project by email"
        className="aspect-video w-full rounded-md "
      />
    </div>
  );
}
