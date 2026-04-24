import { prisma } from "@/lib/prisma";
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

    const prices = await stripe.prices.list({
      lookup_keys: [body.lookup_key],
      expand: ["data.product"],
    });

    const session = await stripe.checkout.sessions.create({
      // customer: activeUser?.data?.activeUser?.id,
      // customer_email: activeUser?.data?.activeUser?.email,
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
      // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings?canceled=true`,
    });
    console.log("🚀 ~ POST ~ session:", session);

    //Save customer id in DB
    const user = await prisma.user.update({
      where: {
        id: activeUser.data.activeUser.id,
      },
      data: {
        stripeCustomerId: session.customer?.toString(),
      },
    });
    console.log("🚀 ~ POST ~ user:", user);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log("🚀 ~ Checkout session", error);
    return NextResponse.json({ error: error.message });
  }
}
