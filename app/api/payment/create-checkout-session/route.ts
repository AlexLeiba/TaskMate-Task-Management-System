import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
type CheckoutBody = {
  lookup_key: string;
};

export async function POST(req: Request) {
  const body: CheckoutBody = await req.json();

  const prices = await stripe.prices.list({
    lookup_keys: [body.lookup_key],
    expand: ["data.product"],
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For usage-based billing, don't pass quantity
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  });

  return NextResponse.redirect(session.url!, 303);
}
