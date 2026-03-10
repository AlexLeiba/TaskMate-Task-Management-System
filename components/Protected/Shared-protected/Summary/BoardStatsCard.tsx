import React from "react";

type Props = {
  children?: React.ReactNode;
};
export function BoardStatsCard({ children }: Props) {
  return (
    <div className=" p-4 rounded-md border border-background bg-background-element">
      {children}
    </div>
  );
}
