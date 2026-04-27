import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { StripeProductsWithPricesType } from "@/lib/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  const activeUser = await verifyCurrentActiveUser();

  try {
    if (!activeUser.data?.activeUser || activeUser.error?.message) {
      throw new Error("User not authorized");
    }

    const customer = await prisma.billing.findFirst({
      where: { userId: activeUser.data.activeUser.id },
    });

    const subscription =
      customer &&
      (await stripe.subscriptions.retrieve(
        customer?.stripeSubscriptionId || "",
        {
          expand: ["items.data.price.product"],
        },
      ));

    const selectedProduct = subscription?.items.data[0].price
      .product as Stripe.Product;
    const products = await stripe.products.list({ limit: 4 });

    const prices = await stripe.prices.list({ limit: 4 });

    const productsWithPrices: (StripeProductsWithPricesType | undefined)[] =
      products.data.map((product) => {
        if (product.active) {
          const associatedPrice = prices.data.find(
            (price) => price.product === product.id,
          );

          // TODO check which id is associated with subsId
          const isCustomerSubscribedToThisProduct =
            customer?.subscriptionStatus === "active" &&
            subscription &&
            selectedProduct.id === product?.id;

          if (!associatedPrice || !associatedPrice.lookup_key) {
            throw new Error("The product has no associated price");
          }
          return {
            name: product.name,
            description: product.description || "",
            lookup_key: associatedPrice?.lookup_key,
            currency: associatedPrice?.currency,
            price: (associatedPrice?.unit_amount || 0) / 100,
            interval: associatedPrice?.recurring?.interval, //day/week/month/year
            isCustomerSubscribed: !!isCustomerSubscribedToThisProduct,
            subscriptionExpiresAt: customer?.subscriptionExpiresAt || null,
            canceledAt: subscription?.cancel_at || 0 || null,
          };
        }
        return undefined;
      });

    return NextResponse.json({ data: productsWithPrices || [] });
  } catch (error: any) {
    NextResponse.json({
      data: [],
      error: error.message || "Something went wrong",
    });
  }
}
