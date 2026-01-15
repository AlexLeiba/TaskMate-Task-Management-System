import { ReporterType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

const cardVariants = cva("", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-10",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const nameVariants = cva("text-base", {
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
const emailVariants = cva("opacity-80", {
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

type Props = VariantProps<typeof cardVariants> & {
  data: ReporterType | undefined;
};
export function UserCard({ data, size }: Props) {
  if (!data) return null;
  return (
    <div className="flex gap-4 items-center overflow-hidden">
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
