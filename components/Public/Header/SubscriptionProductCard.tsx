import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type Props = {
  interval: string;
  name: string;
  price: number;
  description: string;
  currency: string;
};

export const planColorVariants = cva(
  "w-full  rounded-full my-1 py-1 group-hover:text-white",
  {
    variants: {
      standard: {
        true: "bg-linear-to-br from-green-500 to-yellow-400",
      },
      silver: {
        true: "bg-slate-400 bg-linear-to-br from-slate-400 to-slate-600 ",
      },
      gold: {
        true: "bg-amber-400 bg-linear-to-br from-amber-400 to-amber-800",
      },
      diamond: {
        true: "bg-rose-400 bg-linear-to-br from-rose-400 to-pink-800",
      },
    },
    defaultVariants: {
      standard: true,
    },
  },
);

export function SubscriptionProductCard({
  name,
  price,
  description,
  currency,
  interval,
}: Props) {
  return (
    <IconButton
      className={cn(
        "p-4 rounded-md bg-background-element opacity-70 hover:opacity-100 group",
        "opacity-100 hover:ring-fuchsia-400 ring-1",
      )}
      classNameChildren="gap-3 flex flex-col justify-between h-full relative"
    >
      <h4 className="text-xl font-medium">{name}</h4>

      {/* HORIZONTAL LINE */}
      <div className={cn(planColorVariants({ [name.toLowerCase()]: true }))} />

      <div className="flex flex-col gap-2 h-full justify-between">
        <div className="flex items-end gap-1 justify-center">
          {name === "Standard" ? (
            <>
              <p className="text-3xl">FREE</p>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-1 justify-center">
                <p className="text-3xl">{price}</p>
                <p className="text-base">{currency.toUpperCase()}</p> /
                <p>{interval}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-center">{description}</p>

        {/* {name !== "Standard" && !active && (
          <div
            className={cn(
              planColorVariants({ [name.toLowerCase()]: true }),
              "p-3 text-center rounded-md h-full text-black font-medium text-xl ",
              active && "text-white",
            )}
          >
            {active ? "Edit current plan" : "Select plan"}
          </div>
        )} */}
      </div>
    </IconButton>
  );
}
