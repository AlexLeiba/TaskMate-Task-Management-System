import { MoreFeaturesCardData } from "@/lib/types";

type Props = {
  data: MoreFeaturesCardData;
};
export function AboutFeatureCard({ data }: Props) {
  return (
    <div className="rounded-md bg-background-element flex flex-col p-6 gap-4 h-70 justify-between min-w-100 ">
      {data.icon}

      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium">{data.title}</p>

        <p className="text-lg">{data.description}</p>
      </div>
    </div>
  );
}
