import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // For demonstration purposes, we're using the Checkout session to retrieve the customer_account ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    console.log("🚀 ~ POST ~ checkoutSession:", checkoutSession);

    // This is the url to which the customer will be redirected when they're done
    // managing their billing with the portal.

    const portalSession = await stripe.billingPortal.sessions.create({
      customer_account: checkoutSession.customer?.toString() || "",
      return_url: process.env.NEXT_PUBLIC_BASE_URL,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.log("🚀 ~ Portal session ~ error:", error);
    return NextResponse.json({ erroror: error.message });
  }
}
