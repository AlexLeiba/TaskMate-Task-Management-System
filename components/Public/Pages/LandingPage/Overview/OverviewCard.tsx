import { OverviewDataType } from "@/lib/types";
import Image from "next/image";

type Props = {
  data: OverviewDataType;
  handleHover: () => void;
};
export function OverviewCard({ data, handleHover }: Props) {
  return (
    <div
      className="rounded-md bg-stone-900 flex flex-col p-6 gap-4 justify-between relative overflow-hidden h-75  group hover:outline hover:outline-cyan-600"
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
        className=" rounded-lg shadow-lg border border-gray-600 w-full h-full object-cover  absolute translate-y-1/2 left-0 right-0 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
      />
    </div>
  );
}
