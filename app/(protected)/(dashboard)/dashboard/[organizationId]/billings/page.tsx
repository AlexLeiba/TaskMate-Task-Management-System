import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import React from "react";

function BillingsPage() {
  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Billings</h1>
        <CreditCard />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />
    </div>
  );
}

export default BillingsPage;
