import { ActivityType, ReporterType, UserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";
import { UserCardSkeleton } from "./UserCardSkeleton";
import { format } from "date-fns";

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
    data: UserType;
    type?: string;
    description?: string;
    createdAt?: string;
  } & { size?: "sm" | "md" | "lg" };
export function UserCard({
  data,
  size,
  type = "user",
  description,
  createdAt,
  className,
}: Props) {
  if (!data) return <UserCardSkeleton size={size} />;
  return (
    <div
      className={cn(
        "flex gap-4 items-center overflow-hidden text-left",
        className,
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
      {type === "activity" && (
        <div className="flex flex-col gap-2 items-start">
          <p className="text-lg font-medium">{description}</p>
          <p className="text-xs text-gray-300">
            {createdAt && format(new Date(createdAt), "MMM d yyyy a HH:mm")}
          </p>
        </div>
      )}
    </div>
  );
}
