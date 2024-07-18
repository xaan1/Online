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
      "whsec_47e6cd27bb2963e6d59f4271b8cef129f68906d4efcee5db16a9abfa5cba9cc7"
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
