"use client";
import { useEffect, useState } from "react";
import { SubscriptionProductCard } from "@/components/Protected/Pages/Billings/SubscriptionProductCard";
import { SuccesfulPaymentDialog } from "@/components/Protected/Pages/Billings/SuccesfulPaymentDialog";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/config";
import { STRIPE_INTERVAL } from "@/lib/consts/consts";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { StripeProductsWithPricesType } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";

function BillingsPage() {
  const [checkoutStatus, setCheckoutStatus] = useState({
    success: false,
    canceled: false,
    open: false,
  });
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setCheckoutStatus({ success: true, canceled: false, open: true });

      const successPlanMessage = `You have successfully subscribed to ${query.get("plan")} plan.`;
      setSelectedPlan(successPlanMessage);
      // const querySessionId = query.get("session_id");
      // setSessionId(querySessionId || "");
    }

    if (query.get("canceled")) {
      setCheckoutStatus({ success: false, canceled: true, open: true });
      const canceledPlanMessage = `You have canceled the subscription to ${query.get("plan")} plan.`;
      setSelectedPlan(canceledPlanMessage);
    }

    return () => {
      setCheckoutStatus({ success: false, canceled: false, open: false });
    };
  }, []);

  const {
    isLoading,
    data: productsWithPrices,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.pages.billings.products.getProducts],
    queryFn: async () => {
      const response: { data: { data: StripeProductsWithPricesType[] } } =
        await axiosInstance.get("api/payment/webhooks/stripe/products");

      return response.data;
    },
  });

  const isCustomerSubscribed = productsWithPrices?.data.find(
    (product) => product.isCustomerSubscribed,
  );

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
  function handleCheckout({
    lookupKey,
  }: {
    lookupKey: string | undefined | null;
    name: string;
  }) {
    toast.loading("Loading...", {
      id: QUERY_KEYS.pages.billings.products.createCheckoutSession,
    });
    if (!lookupKey) {
      toast.error(
        "Something went wrong, please refresh the page and try again",
      );
      return;
    }

    createCheckoutSession(lookupKey);
  }

  return (
    <>
      <section className="w-full">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-medium">Subscription Plans</h1>
          <CreditCard />
        </div>
        <Separator className="bg-gray-600 w-full my-4" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
          {productsWithPrices?.data &&
            [...productsWithPrices.data]
              .sort((a, b) => a.price - b.price)
              .map((product) => {
                return (
                  <SubscriptionProductCard
                    isCustomerSubscribed={!!isCustomerSubscribed}
                    expiresAt={product.subscriptionExpiresAt}
                    canceledAt={product.canceledAt}
                    disabled={
                      !isCustomerSubscribed
                        ? false
                        : !product.isCustomerSubscribed
                    }
                    currency={product.currency || ""}
                    isPending={isPending}
                    key={product?.name}
                    name={product?.name || ""}
                    price={product?.price}
                    description={product.description}
                    onSelectPlan={() =>
                      !isCustomerSubscribed &&
                      handleCheckout({
                        lookupKey: product.lookup_key,
                        name: product.name,
                      })
                    }
                    interval={product.interval || STRIPE_INTERVAL.monthly}
                    active={product.isCustomerSubscribed}
                  />
                );
              })}
        </div>
      </section>
      <SuccesfulPaymentDialog
        setOpen={() =>
          setCheckoutStatus({ open: true, canceled: false, success: false })
        }
        open={checkoutStatus.canceled || checkoutStatus.success}
        title={selectedPlan}
      />
    </>
  );
}

export default BillingsPage;

// TODO
// show this UI if user alredy has a subscription
// export function PortalCustomer() {
//   const { mutate: createPortalSession, isPending } = useMutation({
//     mutationFn: async () => {
//       const response = await axiosInstance.post(
//         "api/payment/create-portal-session",
//       );
//
//       window.location.href = response.data.url;
//       return response.data;
//     },
//     mutationKey: [QUERY_KEYS.pages.billings.products.createPortalSession],
//     onSuccess: (data) => {
//       toast.success("Portal session created", {
//         id: QUERY_KEYS.pages.billings.products.createPortalSession,
//       });
//
//       window.location.href = data.url;
//     },
//     onError: (error) => {
//       toast.error(error?.message, {
//         id: QUERY_KEYS.pages.billings.products.createPortalSession,
//       });
//     },
//   });
//   return (
//     <div>
//       <Button disabled={isPending} onClick={() => createPortalSession()}>
//         Edit billing details
//       </Button>
//     </div>
//   );
// }
