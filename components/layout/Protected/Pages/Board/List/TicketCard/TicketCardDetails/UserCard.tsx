import { ReporterType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";

const cardVariants = cva("", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const nameVariants = cva("text-base text-gray-300 line-clamp-1", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
const emailVariants = cva("text-gray-400", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Props = VariantProps<typeof cardVariants> &
  ComponentProps<"div"> & {
    data: ReporterType | undefined;
  };
export function UserCard({ data, size, className }: Props) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "flex gap-4 items-center overflow-hidden text-left",
        className
      )}
    >
      {data.avatar && (
        <div className="rounded-full overflow-hidden">
          <Image
            src={data.avatar}
            alt={data.name}
            className={cn(cardVariants({ size }))}
            width={20}
            height={20}
          />
        </div>
      )}
      <div className="flex flex-col ">
        <p className={cn(nameVariants({ size }))}>{data.name}</p>
        <p className={cn(emailVariants({ size }))}>{data.email}</p>
      </div>
    </div>
  );
}
