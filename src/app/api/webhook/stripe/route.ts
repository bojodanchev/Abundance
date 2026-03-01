import { NextResponse, after } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET env var");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 },
    );
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const submissionId = session.metadata?.submission_id;
    const tier = session.metadata?.tier;

    if (!submissionId || !tier) {
      console.error("Missing metadata on checkout session:", session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = getSupabaseAdmin();

    // Handle bump offer purchase separately
    if (tier === "bump") {
      const { error: bumpUpdateError } = await supabase
        .from("submissions")
        .update({ bump_accepted: true })
        .eq("id", submissionId);

      if (bumpUpdateError) {
        console.error("Failed to update bump_accepted:", bumpUpdateError);
      }

      // Insert payment record for bump
      const { error: bumpInsertError } = await supabase.from("payments").insert({
        submission_id: submissionId,
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
        amount_cents: session.amount_total ?? 0,
        currency: session.currency ?? "eur",
        tier,
        status: "paid",
      });

      if (bumpInsertError) {
        console.error("Failed to insert bump payment record:", bumpInsertError);
      }

      return NextResponse.json({ received: true });
    }

    // Update submission: mark as paid with purchased tier
    const { error: updateError } = await supabase
      .from("submissions")
      .update({
        payment_status: "paid",
        tier,
      })
      .eq("id", submissionId);

    if (updateError) {
      console.error("Failed to update submission payment status:", updateError);
    }

    // Insert payment record
    const { error: insertError } = await supabase.from("payments").insert({
      submission_id: submissionId,
      stripe_session_id: session.id,
      stripe_payment_intent: typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
      amount_cents: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      tier,
      status: "paid",
    });

    if (insertError) {
      console.error("Failed to insert payment record:", insertError);
    }

    // Trigger PDF generation (runs after response is sent)
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    after(async () => {
      try {
        await fetch(`${baseUrl}/api/generate-pdf`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.INTERNAL_API_KEY && {
              "x-internal-key": process.env.INTERNAL_API_KEY,
            }),
          },
          body: JSON.stringify({
            submission_id: submissionId,
            tier: "paid",
          }),
        });
      } catch (err) {
        console.error("Failed to trigger PDF generation:", err);
      }
    });
  }

  return NextResponse.json({ received: true });
}
