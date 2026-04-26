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
    // retrieve selected product
    const selectedProduct = await stripe.products.retrieve(prices.data[0].id);

    const session = await stripe.checkout.sessions.create({
      // customer: activeUser?.data?.activeUser?.id,
      // customer_email: activeUser?.data?.activeUser?.email,
      metadata: {
        userId: activeUser?.data?.activeUser?.id,
        productName: selectedProduct.name,
      },
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id, //Price ID
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?success=true`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log("🚀 ~ Checkout session", error);
    return NextResponse.json({ error: error.message });
  }
}
