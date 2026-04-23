"use client";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";

function BillingsPage() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      const querySessionId = query.get("session_id");
      setSessionId(querySessionId || "");
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, [sessionId]);

  if (!success && message === "") {
    return <ProductDisplay />;
  } else if (success && sessionId !== "") {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}

// <div className="w-full ">
//   <div className="flex gap-2 items-center">
//     <h1 className="text-2xl font-medium">Billings</h1>
//     <CreditCard />
//   </div>
//   <Separator className="bg-gray-600 w-full my-4" />
// </div>

export default BillingsPage;

const SuccessDisplay = ({ sessionId }: { sessionId: string }) => {
  return (
    <section>
      <div className="product Box-root">
        <CreditCard />
        <div className="description Box-root">
          <h3>Subscription to Starter Plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const ProductDisplay = () => (
  <section>
    <div className="product">
      <CreditCard />
      <div className="description">
        <h3>Starter Plan</h3>
        <h5>$20.00 / month</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);
