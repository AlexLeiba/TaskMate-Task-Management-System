import Stripe from "stripe";

export function getSubscriptionExpiry(sub: Stripe.Subscription): Date {
  if (sub.cancel_at) {
    return new Date(sub.cancel_at * 1000);
  }
  if (sub.ended_at) {
    return new Date(sub.ended_at * 1000);
  }

  const renewalInterval = sub?.items.data[0].price.recurring?.interval; //day/week/month/year The frequency in which the subscription renews
  const renewalCount = sub?.items.data[0].price.recurring?.interval_count || 1; //the billing will be paid every count of the interval.

  const expiresAt = new Date(sub.billing_cycle_anchor * 1000); //start reference date - sub.billing_cycle_anchor - created sub date

  switch (renewalInterval) {
    case "day":
      expiresAt.setDate(expiresAt.getDate() + renewalCount); //renewalcount will determine every how many days the billing will be paid
      break;
    case "week":
      expiresAt.setDate(expiresAt.getDate() + 7 * renewalCount); // * renewalCount will determine every how many weeks the billing will be paid

      break;
    case "month":
      expiresAt.setMonth(expiresAt.getMonth() + renewalCount);

      break;
    case "year":
      expiresAt.setFullYear(expiresAt.getFullYear() + renewalCount);

      break;

    default:
      expiresAt.setDate(expiresAt.getDate() + renewalCount);
      break;
  }

  return expiresAt;
}
