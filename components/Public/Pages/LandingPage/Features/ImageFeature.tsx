import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const PreviewImageDialog = dynamic(() =>
  import("@/components/Public/PreviewImageDialog/PreviewImageDialog").then(
    (m) => m.PreviewImageDialog,
  ),
);

type Props = {
  image: string;
  description: string;
  title: string;
  previewImage: string;
};
export function ImageFeature({
  image,
  description,
  title,
  previewImage,
}: Props) {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <button
        className="cursor-zoom-in group  hover:scale-105 transition-all duration-500 relative lg:w-[calc(50vw-((100vw-1152px+48px)/2))] md:w-[calc(50vw-48px)]  w-[calc(100vw-32px)] "
        onClick={() => setSelected(true)}
      >
        <div className="group-hover:bg-black/50 absolute inset-0 transition-all duration-500 ease-in-out bg-black/10"></div>
        <Image
          src={image}
          width={1000}
          height={800}
          alt="Hero-image"
          className=" object-cover rounded-md h-full group-hover:border-none border border-cyan-600 w-full"
        />
        <Expand
          className={cn(
            " group-hover:scale-125 group-hover:opacity-100 opacity-80 transition-all duration-500 ease-in-out text-white absolute bottom-4 right-4 group-hover:right-8 group-hover:bottom-6 cursor-pointer",
          )}
        />
      </button>
      {selected && (
        <PreviewImageDialog
          setSelected={setSelected}
          isOpen={selected}
          image={previewImage}
          title={title}
          description={description}
        />
      )}
    </>
  );
}
