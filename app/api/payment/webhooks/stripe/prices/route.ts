import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const prices = await stripe.prices.list({ limit: 3 });

    return NextResponse.json({ data: prices.data });
  } catch (error: any) {
    NextResponse.json({
      data: [],
      error: error.message || "Something went wrong",
    });
  }
}
