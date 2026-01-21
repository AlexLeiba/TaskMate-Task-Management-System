import { cn } from "@/lib/utils";

type Props = {
  percentage: number;
};
export function ProgressBar({ percentage }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xs">{percentage}%</p>
      <div className="w-full  relative">
        <div className="h-px bg-gray-200 absolute left-0 top-0 z-0 w-full"></div>

        <div
          className={cn(
            percentage >= 50 ? "bg-green-600" : "bg-yellow-400",
            "h-px  z-10 absolute top-0",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
