import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
type CheckoutBody = {
  lookup_key: string;
};

export async function POST(req: NextRequest) {
  const activeUser = await verifyCurrentActiveUser();

  try {
    const { orgId } = await auth();
    if (!activeUser.data?.activeUser || activeUser.error?.message)
      throw new Error("User not authorized");

    const body: CheckoutBody = await req.json();

    //retrieve the price ID of the selected product
    const prices = await stripe.prices.list({
      lookup_keys: [body.lookup_key],
      expand: ["data.product"],
    });

    const selectedProduct = prices.data[0].product as Stripe.Product;

    // 1. Check existing active subscription
    const subs = await stripe.subscriptions.list({
      customer: activeUser?.data?.stripeCustomerId,
      status: "active",
      limit: 1,
    });

    const activeSub = subs.data[0];

    // =========================
    // CASE 1: UPDATE EXISTING SUB (EXISTING CUSTOMER)
    // =========================

    if (activeSub && activeUser?.data?.stripeCustomerId) {
      const subscriptionItemId = activeSub.items.data[0].id;
      await stripe.subscriptions.update(activeSub.id, {
        items: [
          {
            id: subscriptionItemId,
            price: prices.data[0].id,
          },
        ],
        proration_behavior: "always_invoice",
      });

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?success=true&plan=${selectedProduct?.name}`,
      });
    }

    // =========================
    // CASE 2: CREATE NEW SUB (NEW CUSTOMER)
    // =========================
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: activeUser?.data?.stripeCustomerId, //stripe will identify registered customer by this id if exists
      line_items: [
        {
          price: prices.data[0].id, //Price ID
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      metadata: {
        userId: activeUser?.data?.activeUser?.id,
      },
      billing_address_collection: "auto",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?success=true&plan=${selectedProduct?.name}`,
      // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true&plan=${selectedProduct?.name}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log("🚀 ~ Checkout session", error);
    return NextResponse.json({ error: error.message });
  }
}
