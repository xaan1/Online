import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import db from "@/lib/db";

export async function POST(req: Request) {
  const rawBody = await req.text();
  console.log(rawBody, "body");
  const signature = req.headers.get("Stripe-Signature") as string;
  console.log(signature, "signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
       process.env.STRIPE_WEBHOOK_SECREET!
    );
    console.log(event , "signature")
  } catch (error: any) {
    console.log("[WEBHOOK_ERROR]", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;
  console.log(userId, courseId, "userId, courseId");

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Webhook Error: Missing metadata", { status: 600 });
    }

    const purchase = await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
      },
    });

    console.log(purchase, "purchase created webhook");
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}
