import React from "react";
import { BoardExampleCard } from "./BoardExampleCard";
import { EmailExampleCard } from "./EmailExampleCard";

export function FromMessageToAction() {
  return (
    <div className="relative lg:pb-41 pb-60 ">
      <div className="flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-5xl">From inbox to action</h2>
          <p className="text-lg">
            Quickly jump into task actions from your inbox, keeping all your
            discussions and tasks organized in one place.
          </p>
        </div>

        <EmailExampleCard />
      </div>
      <BoardExampleCard />
    </div>
  );
}
