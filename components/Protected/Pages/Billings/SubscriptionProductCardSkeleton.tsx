import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import React from "react";

export function SubscriptionProductCardSkeleton() {
  const plans = Array.from({ length: 4 }, (_, index) => index);
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Subscription Plans</h1>
        <CreditCard />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 h-75 ">
        {plans.map((item) => (
          <div
            key={item}
            className="animate-pulse bg-gray-700 rounded-md p-4 "
          ></div>
        ))}
      </div>
    </div>
  );
}
