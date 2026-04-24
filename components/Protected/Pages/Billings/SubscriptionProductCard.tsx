import { IconButton } from "@/components/ui/iconButton";

type Props = {
  name: string;
  price: number;
  description: string;
  isPending: boolean;
  onSelectPlan: () => void;
};

export function SubscriptionProductCard({
  name,
  price,
  description,
  isPending,
  onSelectPlan,
}: Props) {
  return (
    <IconButton
      disabled={isPending}
      className="p-4 rounded-md bg-background-element  text-left"
      onClick={onSelectPlan}
    >
      <h4 className="text-2xl">{name}</h4>
      <p>{price}</p>
      <p>{description}</p>
    </IconButton>
  );
}
