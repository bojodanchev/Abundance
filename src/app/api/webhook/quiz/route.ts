import { NextResponse, after } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { quizSubmissionSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    // --- Rate limiting: basic global throttle ---
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await getSupabaseAdmin()
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", fiveMinutesAgo);

    // Allow max 10 submissions per 5 min globally (tighten per-IP in production)
    if (count !== null && count > 50) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // --- Parse & validate ---
    const body = await request.json();
    const parsed = quizSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // --- Save to Supabase ---
    const { data: submission, error: insertError } = await getSupabaseAdmin()
      .from("submissions")
      .insert({
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone ?? null,
        locale: data.locale,
        scores: data.scores,
        priority_top3: data.priority_top3,
        goals: data.goals ?? null,
        birth_date: data.birth_date,
        birth_time: data.birth_time ?? null,
        birth_time_unknown: data.birth_time_unknown,
        birth_city: data.birth_city ?? null,
        birth_country: data.birth_country ?? null,
        commitment_level: data.commitment_level,
        income_level: data.income_level,
        utm_source: data.utm_source ?? null,
        utm_medium: data.utm_medium ?? null,
        utm_campaign: data.utm_campaign ?? null,
        referral_code: data.referral_code ?? null,
        gdpr_consent: data.gdpr_consent,
        gdpr_consent_at: new Date().toISOString(),
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !submission) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to save submission" },
        { status: 500 }
      );
    }

    const internalApiKey = process.env.INTERNAL_API_KEY;
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const isPrelaunch = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === "true";

    if (isPrelaunch) {
      // --- Pre-launch mode: send confirmation email, skip AI analysis ---
      after(async () => {
        try {
          await fetch(`${baseUrl}/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(internalApiKey && { "x-internal-key": internalApiKey }),
            },
            body: JSON.stringify({
              submission_id: submission.id,
              email_type: "prelaunch",
            }),
          });
        } catch (err) {
          console.error("Failed to send pre-launch email:", err);
        }
      });
    } else {
      // --- Trigger async analysis generation ---
      after(async () => {
        try {
          await fetch(`${baseUrl}/api/generate-analysis`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(internalApiKey && { "x-internal-key": internalApiKey }),
            },
            body: JSON.stringify({ submission_id: submission.id }),
          });
        } catch (err) {
          console.error("Failed to trigger analysis generation:", err);
        }
      });
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      prelaunch: isPrelaunch,
    });
  } catch (error) {
    console.error("Quiz webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
