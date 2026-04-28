import { SUBSCRIPTION_STATUS } from "@/lib/consts/consts";
import { prisma } from "@/lib/prisma";
import { getSubscriptionExpiry } from "@/lib/server/getSubscriptionExpiry";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const bodyRaw = await request.text(); //stripe sends event data in req body where the object is relevant to the triggered event.
  console.log("🚀 BODY RAW", bodyRaw);
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
      console.log("🚀 ~ EVENT:\n\n\n\n", event);

      // Handle the event
      switch (event?.type) {
        case "checkout.session.completed":
          {
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

            const price = sub.items.data[0].price;

            let planName = "";
            if (typeof price.product === "object" && "name" in price.product) {
              planName = price.product.name;
            }

            await prisma.billing.create({
              data: {
                userId: userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: sub.id,
                subscriptionStatus: SUBSCRIPTION_STATUS.processing,
                priceId: sub.items.data[0].price.id,
                planName, //to indentify visually in DB user plan
                currency: sub.items.data[0].price.currency,
                interval: sub.items.data[0].price.recurring?.interval, //monthly / yearly
              },
            });
          }
          break;

        case "checkout.session.expired":
          console.log("CHECKOUT SESSION EXPIRED");
          break;
        case "invoice.paid":
          {
            const subscriptionId = event.data.object.parent
              ?.subscription_details?.subscription as string;
            const cutomerId = event.data.object.customer as string;

            const sub = await stripe.subscriptions.retrieve(subscriptionId, {
              expand: ["items.data.price.product"],
            });

            const subscriptionExpiresAt = getSubscriptionExpiry(sub);

            await prisma.billing.update({
              where: {
                stripeCustomerId: cutomerId,
              },
              data: {
                subscriptionStatus: SUBSCRIPTION_STATUS.paid,
                subscriptionExpiresAt,
              },
            });
          }
          break;
        case "invoice.payment_failed":
          const subscriptionId = event.data.object.parent?.subscription_details
            ?.subscription as string;
          const cutomerId = event.data.object.customer as string;
          //id passed in metadata obj when
          await prisma.billing.update({
            where: {
              stripeCustomerId: cutomerId,
              stripeSubscriptionId: subscriptionId,
            },
            data: {
              subscriptionStatus: SUBSCRIPTION_STATUS.failed,
            },
          });
          break;
        // CREATE
        // whenever a customer sign up for a new plan
        case "customer.subscription.created":
          {
            const subscription = event.data.object;
            const price = subscription.items.data[0].price;

            let planName = "";
            if (typeof price.product === "object" && "name" in price.product) {
              planName = price.product.name;
            }

            const cutomerId = event.data.object.customer as string;

            // Update customer subscription
            await prisma.billing.upsert({
              where: {
                userId: cutomerId,
                stripeCustomerId: cutomerId,
              },
              update: {
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: SUBSCRIPTION_STATUS.processing,
                priceId: price.id,
                planName: planName, //to indentify visually in DB user plan
                currency: price.currency,
                interval: price.recurring?.interval, //monthly / yearly
              },
              create: {
                userId: cutomerId,
                stripeCustomerId: cutomerId,
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: SUBSCRIPTION_STATUS.processing,
                priceId: price.id,
                planName: planName, //to indentify visually in DB user plan
                currency: price.currency,
                interval: price.recurring?.interval, //monthly / yearly
              },
            });
          }
          break;

        // DELETED
        // subscription is fully ended / no more access / user hasn't paid
        case "customer.subscription.deleted": {
          const customerId = event.data.object.customer as string;

          await prisma.billing.update({
            where: {
              stripeCustomerId: customerId,
            },
            data: {
              subscriptionStatus: SUBSCRIPTION_STATUS.inactive,
            },
          });
          break;
        }

        // UPDATED
        // plan upgrade / downgrade / cancel at period end / renewal date changes / payment method issues
        case "customer.subscription.updated": {
          //whenever a customer changes plan
          const subscription = event.data.object;
          const price = subscription.items.data[0].price;

          const cutomerId = event.data.object.customer as string;

          let planName = "";
          if (typeof price.product === "object" && "name" in price.product) {
            planName = price.product.name;
          }

          const subscriptionExpiresAt = getSubscriptionExpiry(subscription);

          const updateData: any = {
            subscriptionExpiresAt,
          };

          const billing = await prisma.billing.findFirst({
            where: {
              stripeSubscriptionId: subscription.id,
            },
          });
          //  UPDATE priceId and planName ONLY IF IS DIFFERENT THAN OLD ONE
          if (billing?.priceId !== price.id) {
            updateData.priceId = price.id;
            updateData.planName = planName;
            updateData.currency = price.currency;
            updateData.interval = price.recurring?.interval;
          }

          await prisma.billing.update({
            where: {
              stripeCustomerId: cutomerId,
            },
            data: {
              ...updateData,
            },
          });
          break;
        }

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
