import React from "react";

type Props = {
  children: React.ReactNode;
};
export function LegendValue({ children }: Props) {
  return (
    <div className="px-2 rounded-full flex justify-center items-center bg-accent">
      <p>{children}</p>
    </div>
  );
}
