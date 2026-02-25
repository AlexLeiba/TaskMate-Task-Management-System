import { Button } from "@/components/ui/button";
import { MoreFeaturesCardData } from "@/lib/consts";
import React from "react";

type Props = {
  data: MoreFeaturesCardData;
};
export function AboutFeatureCard({ data }: Props) {
  return (
    <div className="rounded-md bg-background-element flex flex-col p-6 gap-4 h-full justify-between">
      {data.icon}

      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium">{data.title}</p>

        <p className="text-lg">{data.description}</p>
      </div>

      <Button variant={"outline"}>Browse {data.title}</Button>
    </div>
  );
}
