import { prisma } from "@/lib/prisma";
import { getSubscriptionExpiry } from "@/lib/server/getSubscriptionExpiry";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const bodyRaw = await request.text(); //stripe sends event data in req body where the object is relevant to the triggered event.
  console.log("🚀 ~ POST ~ bodyRaw:", bodyRaw);
  // console.log("🚀 ~ POST ~ event:\n\n\n", event);

  //  https://dashboard.stripe.com/webhooks
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature")!;
    try {
      const event = stripe.webhooks.constructEvent(
        bodyRaw,
        signature,
        endpointSecret,
      );

      let subscription;
      let status;
      // Handle the event
      switch (event?.type) {
        case "checkout.session.completed":
          subscription = event.data.object;
          status = subscription.status;

          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId; //id passed in metadata obj when creating checkout session
          if (!userId) {
            throw new Error("User not found");
          }

          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          console.log("🚀 ~  SUB-checkout.session.completed :\n\n\n\n\n", sub);
          console.log(
            "🚀 ~  SUB-checkout.session.completed :\n\n\n\n\n",
            sub.items.data[0].plan.product,
          );
          console.log(
            "🚀 ~  SUB-checkout.session.completed :\n\n\n\n\n",
            sub.items.data[0],
          );

          const subscriptionExpiresAt = getSubscriptionExpiry(sub);

          await prisma.billing.create({
            data: {
              userId: userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: sub.id,
              subscriptionStatus: sub.status, //active/inactive
              priceId: sub.items.data[0].price.id, // plan name
              subscriptionExpiresAt, //when the subscription will end
              interval: sub.items.data[0].price.recurring?.interval, //monthly / yearly
            },
          });
          break;

        case "checkout.session.expired":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case "customer.subscription.deleted":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case "customer.subscription.updated":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case "invoice.created":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription trial ending.
          // handleSubscriptionTrialEnding(subscription);
          break;
        case "invoice.paid":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription created.
          // handleSubscriptionCreated(subscription);
          break;
        case "invoice.finalized":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription update.
          // handleSubscriptionUpdated(subscription);
          break;
        case "invoice.payment_succeeded":
          subscription = event.data.object;
          console.log(
            `Active entitlement summary updated for ${subscription}.`,
          );
          // Then define and call a method to handle active entitlement summary updated
          // handleEntitlementUpdated(subscription);
          break;
        case "invoice.payment_failed":
          subscription = event.data.object;
          console.log(
            `Active entitlement summary updated for ${subscription}.`,
          );
          // Then define and call a method to handle active entitlement summary updated
          // handleEntitlementUpdated(subscription);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event?.type}.`);
      }
      // Return a 200 response to acknowledge receipt of the event
      return NextResponse.json({ received: true });
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      console.log("bodyRaw", bodyRaw);
      return NextResponse.json({ error: err.message });
    }
  }
}
