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
      console.log("🚀 ~ POST ~ event:\n\n\n\n", event);

      let subscription;
      let status;
      // Handle the event
      switch (event?.type) {
        case "checkout.session.completed":
          {
            subscription = event.data.object;
            status = subscription.status;

            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId; //id passed in metadata obj when creating checkout session

            if (!userId) {
              throw new Error("User not found");
            }

            const customerId = session.customer as string;
            const subscriptionId = session.subscription as string;

            const sub = await stripe.subscriptions.retrieve(subscriptionId, {
              expand: ["items.data.price.product"],
            });

            const product = sub.items.data[0].price.product as Stripe.Product;

            const subscriptionExpiresAt = getSubscriptionExpiry(sub);

            await prisma.billing.create({
              data: {
                userId: userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: sub.id,
                subscriptionStatus: "processing", //active/inactive
                priceId: sub.items.data[0].price.id, // plan name
                planName: product.name, //to indentify visually in DB user plan
                currency: sub.items.data[0].price.currency,
                subscriptionExpiresAt, //when the subscription will end
                interval: sub.items.data[0].price.recurring?.interval, //monthly / yearly
              },
            });
          }
          break;

        case "checkout.session.expired":
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case "invoice.paid":
          {
            //whenever a customer changes plan.
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            console.log("🚀 ~ \n\n\n\n\n\n: PAID", event.data);
            const subscriptionId = event.data.object.parent
              ?.subscription_details?.subscription as string;
            const cutomerId = event.data.object.customer as string;
            //id passed in metadata obj when
            await prisma.billing.update({
              where: {
                stripeCustomerId: cutomerId,
                stripeSubscriptionId: subscriptionId,
              },
              data: {
                subscriptionStatus: "paid", //active/inactive
              },
            });
            // Then define and call a method to handle the subscription deleted.
            // handleSubscriptionDeleted(subscriptionDeleted);
          }
          break;
        case "invoice.payment_failed": //whenever a customer changes plan.
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          console.log("🚀 ~ \n\n\n\n\n\n: PAYMENT FAILED", event.data);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          const subscriptionId = event.data.object.parent?.subscription_details
            ?.subscription as string;
          const cutomerId = event.data.object.customer as string;
          //id passed in metadata obj when
          await prisma.billing.update({
            // @ts-ignore
            where: {
              stripeCustomerId: cutomerId,
              stripeSubscriptionId: subscriptionId,
            },
            data: {
              subscriptionStatus: "failed", //active/inactive
            },
          });
          break;
        case "customer.subscription.created": //whenever a customer sign up for a new plan
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          console.log(`Subscription status is ${status}.`);
          console.log("🚀 ~ \n\n\n\n\n\n: CREATED", event.data);
          break;
        case "customer.subscription.deleted": //whenever a customer's subscription ends.
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          console.log(`Subscription status is ${status}.`);
          console.log("🚀 ~ \n\n\n\n\n\n: DELETED", event.data);
          break;
        case "customer.subscription.updated": //whenever a customer changes plan.
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          console.log("🚀 ~ \n\n\n\n\n\n: UPDATEDDDD", event.data);

          //CHECK IF WAS CANCELED
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
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
