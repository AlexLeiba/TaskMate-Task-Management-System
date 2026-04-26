import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { CurrentActivePlanBadge } from "./CurrentActivePlanBadge";
import { STRIPE_PRODUCT_NAME } from "@/lib/consts/consts";

type Props = {
  name: string;
  price: number;
  description: string;
  isPending: boolean;
  currency: string;
  interval: string;
  disabled?: boolean;
  active?: boolean;
  onSelectPlan: () => void;
};

const planColorVariants = cva(
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
  isPending,
  currency,
  interval,
  disabled,
  active,
  onSelectPlan,
}: Props) {
  return (
    <IconButton
      disabled={isPending || disabled}
      className={cn(
        "p-4 rounded-md bg-background-element opacity-70 hover:opacity-100 group",
        active
          ? "opacity-100"
          : name === STRIPE_PRODUCT_NAME.Standard && "opacity-100",
      )}
      onClick={onSelectPlan}
      classNameChildren="gap-3 flex flex-col justify-between h-full relative"
    >
      {active ? (
        <CurrentActivePlanBadge />
      ) : (
        name === STRIPE_PRODUCT_NAME.Standard && <CurrentActivePlanBadge />
      )}

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
            <>
              <p className="text-3xl">{price}</p>
              <p className="text-base">{currency.toUpperCase()}</p> /
              <p>{interval}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-center">{description}</p>

        {name !== "Standard" && (
          <div
            className={cn(
              planColorVariants({ [name.toLowerCase()]: true }),
              "p-3 text-center rounded-md h-full text-black font-medium text-xl ",
            )}
          >
            Get this plan
          </div>
        )}
      </div>
    </IconButton>
  );
}
