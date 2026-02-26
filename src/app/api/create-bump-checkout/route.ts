import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { createBumpCheckoutSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createBumpCheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { submission_id, locale } = parsed.data;

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
            unit_amount: 800,
            product_data: {
              name: "Express Review + 7-Day AI Assistant — CODE: ABUNDANCE",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        submission_id,
        tier: "bump",
      },
      success_url: `${baseUrl}/${locale}/processing?id=${submission_id}&bump=1`,
      cancel_url: `${baseUrl}/${locale}/bump-offer?id=${submission_id}`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Create bump checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
