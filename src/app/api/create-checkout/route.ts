import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { createCheckoutSchema } from "@/lib/schemas";

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  low: { amount: 3700, name: "Пълен Доклад — CODE: ABUNDANCE" },
  mid: { amount: 14700, name: "Премиум Доклад — CODE: ABUNDANCE" },
  high: { amount: 69700, name: "VIP Coaching — CODE: ABUNDANCE" },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createCheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { submission_id, tier, locale } = parsed.data;

    // Fetch submission to get email for Stripe prefill
    const { data: submission, error: fetchError } = await getSupabaseAdmin()
      .from("submissions")
      .select("id, user_email")
      .eq("id", submission_id)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 },
      );
    }

    const tierConfig = TIER_PRICES[tier];

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const email = submission.user_email as string;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: tierConfig.amount,
            product_data: {
              name: tierConfig.name,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        submission_id,
        tier,
      },
      success_url: `${baseUrl}/${locale}/thank-you?session_id={CHECKOUT_SESSION_ID}&tier=${tier}&id=${submission_id}&email=${encodeURIComponent(email)}`,
      cancel_url: `${baseUrl}/${locale}/results/${submission_id}`,
    });

    // Save stripe session ID on the submission
    await getSupabaseAdmin()
      .from("submissions")
      .update({ stripe_session_id: session.id })
      .eq("id", submission_id);

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
