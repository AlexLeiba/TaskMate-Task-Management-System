import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const bodyRaw = await request.text();

  let event = body; //stripe sends event data in req body where the object is relevant to the triggered event.
  console.log("🚀 ~ POST ~ event:\n\n\n", event);

  //  https://dashboard.stripe.com/webhooks
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature")!;
    try {
      event = stripe.webhooks.constructEvent(
        bodyRaw,
        signature,
        endpointSecret,
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: err.message });
    }
  }

  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`DATA \n\n\n\n->>> ${event.data.object}.`);
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId; //id passed in metadata obj when creating checkout session

      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      // retrieve subs data from stripe and save it to DB using subsId
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      console.log("🚀 ~ POST ~ SUB:\n\n\n\n\n", sub);

      //     await prisma.user.update({
      //       where: {
      //         id: userId,
      //       },
      //       data: {
      //     stripeCustomerId: customerId
      //     stripeSubscriptionId: sub.id,
      //     subscriptionStatus: sub.status,//paid / unpaid
      //     priceId: sub.items.data[0].price.id,// plan name
      //     currentPeriodEnd: new Date(1000 * 1000),//when the subscription will end
      //     interval:sub.items.data[0].price.recurring?.interval,//monthly / yearly
      //
      //       },
      //     });
      break;
    case "checkout.session.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Customer data->>> ${event.data.object.customer}.`);

      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding(subscription);

      // TODO update in DB the status of the subscription

      break;
    case "checkout.session.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Customer data->>> ${event.data.object.customer}.`);
      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding(subscription);

      //TODO change the status of the subscription in DB

      break;
    case "customer.subscription.trial_will_end":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding(subscription);
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription deleted.
      // handleSubscriptionDeleted(subscriptionDeleted);
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription created.
      // handleSubscriptionCreated(subscription);
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      break;
    case "entitlements.active_entitlement_summary.updated":
      subscription = event.data.object;
      console.log(`Active entitlement summary updated for ${subscription}.`);
      // Then define and call a method to handle active entitlement summary updated
      // handleEntitlementUpdated(subscription);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
