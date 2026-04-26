import { axiosInstance } from "@/lib/config";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { planColorVariants } from "./SubscriptionProductCard";

export function CustomerPortal({ planName }: { planName: string }) {
  const { mutate: createPortalSession, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        "api/payment/webhooks/stripe/create-portal-session",
      );

      window.location.href = response.data.url;
      return response.data;
    },
    mutationKey: [QUERY_KEYS.pages.billings.products.createPortalSession],
    onSuccess: (data) => {
      toast.dismiss(QUERY_KEYS.pages.billings.products.createPortalSession);

      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error?.message, {
        id: QUERY_KEYS.pages.billings.products.createPortalSession,
      });
    },
  });

  function handleOpenPortal() {
    toast.loading("Loading...", {
      id: QUERY_KEYS.pages.billings.products.createPortalSession,
    });
    createPortalSession();
  }

  return (
    <div
      onClick={(e) => {
        if (!isPending) {
          e.stopPropagation();
          handleOpenPortal();
        }
      }}
      tabIndex={0}
      role="button"
      className={cn(
        planColorVariants({ [planName.toLowerCase()]: true }),
        "p-3 text-center rounded-md h-full text-black font-medium text-xl hover:opacity-80 cursor-pointer",
        "text-white",
      )}
    >
      Edit subscription
    </div>
  );
}
