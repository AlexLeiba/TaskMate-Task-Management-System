import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 3 });

    const prices = await stripe.prices.list({ limit: 3 });

    const productsWithPrices = products.data.map((product) => {
      if (product.active) {
        const associatedPrice = prices.data.find(
          (price) => price.product === product.id,
        );
        return {
          ...product,
          // price data
          price: {
            price_amount: associatedPrice?.unit_amount,
            payment_type: associatedPrice?.type, //recurring
            lookup_key: associatedPrice?.lookup_key,
            priceId: associatedPrice?.id,
            recurring: {
              interval: associatedPrice?.recurring?.interval,
              interval_count: associatedPrice?.recurring?.interval_count,
            },
            tax_behavior: associatedPrice?.tax_behavior,
            currency: associatedPrice?.currency,
          },
        };
      }
    });

    return NextResponse.json({ data: productsWithPrices });
  } catch (error: any) {
    NextResponse.json({
      data: [],
      error: error.message || "Something went wrong",
    });
  }
}
