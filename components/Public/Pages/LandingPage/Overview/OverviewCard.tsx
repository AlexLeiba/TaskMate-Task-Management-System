import { OverviewDataType } from "@/lib/types";
import Image from "next/image";

type Props = {
  data: OverviewDataType;
  index: number;
  handleHover: () => void;
};
export function OverviewCard({ data, handleHover, index }: Props) {
  return (
    <div
      className="rounded-md bg-muted shadow-2xl flex flex-col p-6 gap-4 justify-between relative overflow-hidden h-75  group hover:outline hover:outline-cyan-800"
      onMouseEnter={handleHover}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium">{data.title}</p>

        <p className="text-lg">{data.description}</p>
      </div>

      <Image
        src={data.icon as string}
        alt={data.title}
        width={600}
        height={300}
        style={{ animationDelay: `${index * 200}ms` }}
        className=" bg-background-element rounded-lg shadow-lg border border-gray-500 w-full h-full object-cover  absolute  left-0 right-0 group-hover:translate-y-0 translate-y-1/2 transition-all duration-500 ease-in-out overview-image "
      />
    </div>
  );
}
