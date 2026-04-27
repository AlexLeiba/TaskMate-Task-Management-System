import { prisma } from "@/lib/prisma";
import { verifyCurrentActiveUser } from "@/lib/server/verifyCurrentActiveUser";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const activeUser = await verifyCurrentActiveUser();
  try {
    if (!activeUser.data || activeUser.error?.message)
      throw new Error("User not authorized");

    const { orgId } = await auth();

    const customerData = await prisma.billing.findFirst({
      where: {
        userId: activeUser.data.activeUser?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerData?.stripeCustomerId || "",
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${orgId}/billings`, //for redirect from portal back to dashboard
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.log("🚀 ~ Portal session ~ error:", error);
    return NextResponse.json({ erroror: error.message });
  }
}
