import { TaskOrganizationType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { variantsPublicCardColors } from "@/lib/color-variants/variantsPublicCardColors";

type Props = {
  data: TaskOrganizationType;
  index: 1 | 2 | 3 | 4 | 5;
  selected: boolean;
  handleClick: () => void;
};
export function FeatureCard({ data, selected, index, handleClick }: Props) {
  return (
    <div
      data-test={`feature-card`}
      title={`Select - ${data.title}`}
      aria-label={`Select - ${data.title}`}
      tabIndex={0}
      role="button"
      className={cn(
        selected ? "shadow-2xl  bg-muted scale-100" : "scale-90",
        "flex flex-col gap-2 cursor-pointer rounded-md py-4 px-6 relative overflow-hidden transition-all",
      )}
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <div
        className={cn(
          selected ? "h-full" : " h-0",
          "absolute  w-2 left-0 top-0 transition-all duration-500 ease-in-out",
          variantsPublicCardColors({ index }),
        )}
      />
      {/* opacity 1 , title translate-x-30 */}
      <div className="flex items-center gap-2  ">
        <div
          className={cn(
            selected ? "opacity-100" : "opacity-0 ",
            " absolute transition-all duration-500 ease-in-out",
          )}
        >
          {data.icon}
        </div>

        <p
          className={cn(
            selected ? "translate-x-8.75" : " ",
            "text-xl transition-all duration-500 ease-in-out",
          )}
        >
          {data.title}
        </p>
      </div>
      <p className="text-base">{data.description}</p>
    </div>
  );
}
