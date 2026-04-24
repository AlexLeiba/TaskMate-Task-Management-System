"use client";
import { SubscriptionProductCard } from "@/components/Protected/Pages/Billings/SubscriptionProductCard";
import { SuccesfulPaymentDialog } from "@/components/Protected/Pages/Billings/SuccesfulPaymentDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/config";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { StripeProductType } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return (
      <>
        {/* <SuccesfulPaymentDialog
          setOpen={setSuccess}
          open={success}
          title="Plan bro"
        /> */}
        <PortalCustomer sessionId={sessionId} />;
      </>
    );
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

export function PortalCustomer({ sessionId }: { sessionId: string }) {
  const { mutate: createPortalSession, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        "api/payment/create-portal-session",
        {
          session_id: sessionId,
        },
      );

      window.location.href = response.data.url;
      return response.data;
    },
    mutationKey: [QUERY_KEYS.pages.billings.products.createPortalSession],
    onSuccess: (data) => {
      toast.success("Portal session created", {
        id: QUERY_KEYS.pages.billings.products.createPortalSession,
      });

      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error?.message, {
        id: QUERY_KEYS.pages.billings.products.createPortalSession,
      });
    },
  });
  return (
    <div>
      <Button disabled={isPending} onClick={() => createPortalSession()}>
        Edit billing details
      </Button>
    </div>
  );
}

// customer id must be saved in BD
//Then i will be able to open Customer portal by sending as a parameter my customer ID and check my subscription and billings.

const ProductDisplay = () => {
  const {
    isLoading,
    data: productsWithPrices,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.pages.billings.products.getProducts],
    queryFn: async () => {
      const response: { data: { data: StripeProductType[] } } =
        await axiosInstance.get("api/payment/webhooks/stripe/products");

      return response.data;
    },
  });
  console.log("🚀 ~ ProductDisplay ~ productsWithPrices:", productsWithPrices);

  useEffect(() => {
    // TODO , add skeletons of sub cards
    if (isLoading) toast.loading("Loading products...");

    toast.dismiss();
  }, [isLoading]);

  useEffect(() => {
    if (error) toast.error(error?.message);
  }, [error]);

  const { mutate: createCheckoutSession, isPending } = useMutation({
    mutationFn: async (lookupKey: string) => {
      const response = await axiosInstance.post(
        "/api/payment/webhooks/stripe/create-checkout-session",
        {
          lookup_key: lookupKey,
        },
      );
      console.log("🚀 ~ ProductDisplay ~ response\n\n:", response);

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error(
          "Something went wrong,checkout url is missing, please refresh the page and try again",
        );
      }
      return response.data;
    },
    mutationKey: [QUERY_KEYS.pages.billings.products.createCheckoutSession],
    onSuccess: () => {
      toast.success("Checkout session created", {
        id: QUERY_KEYS.pages.billings.products.createCheckoutSession,
      });
    },
    onError: (error) => {
      toast.error(error?.message, {
        id: QUERY_KEYS.pages.billings.products.createCheckoutSession,
      });
    },
  });
  function handleCheckout(lookupKey: string) {
    toast.loading("Loading...", {
      id: QUERY_KEYS.pages.billings.products.createCheckoutSession,
    });
    createCheckoutSession(lookupKey);
  }
  return (
    <section>
      <h1 className="text-3xl font-medium">Plans</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
        {productsWithPrices?.data?.map((product) => {
          return (
            <SubscriptionProductCard
              isPending={isPending}
              key={product.id}
              name={product.name}
              price={product.price.price_amount / 100}
              description={product?.description}
              onSelectPlan={() => handleCheckout(product.price.lookup_key)}
            />
          );
        })}
      </div>
    </section>
  );
};

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);
