import React from "react";

type Props = {
  color: string;
};
export function LegendColor({ color }: Props) {
  return <div style={{ background: color || "#000000" }} className="size-4" />;
}
