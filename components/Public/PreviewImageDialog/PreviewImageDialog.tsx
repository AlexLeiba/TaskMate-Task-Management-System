import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  description: string;
  image: string;
  isOpen: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
};
export function PreviewImageDialog({
  description,
  image,
  title,
  isOpen,
  setSelected,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setSelected}>
      <DialogContent
        className="lg:px-8 px-4  min-w-[60%]  min-h-[80%] max-h-[90%] max-w-[90%]"
        aria-describedby={`The dialog is used to delete ${title}`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-xl text-left">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-full flex flex-col justify-end  overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={1000}
            height={800}
            className=" aspect-video  object-cover border border-cyan-800 rounded-md w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
