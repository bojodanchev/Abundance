import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { leadCaptureSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    // --- Rate limiting: basic global throttle ---
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await getSupabaseAdmin()
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "lead")
      .gte("created_at", fiveMinutesAgo);

    if (count !== null && count > 30) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // --- Parse & validate ---
    const body = await request.json();
    const parsed = leadCaptureSchema.safeParse(body);

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

    // --- Check for duplicate (same email + source within last hour) ---
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: dupeCount } = await getSupabaseAdmin()
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("user_email", data.user_email.trim().toLowerCase())
      .eq("utm_source", data.source)
      .gte("created_at", oneHourAgo);

    if (dupeCount && dupeCount > 0) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    // --- Build extra metadata ---
    const metadata: Record<string, unknown> = {};
    if (data.message) metadata.message = data.message;
    if (data.extra) Object.assign(metadata, data.extra);

    // --- Insert into submissions table ---
    const { data: submission, error: insertError } = await getSupabaseAdmin()
      .from("submissions")
      .insert({
        user_name: data.user_name.trim(),
        user_email: data.user_email.trim().toLowerCase(),
        user_phone: data.user_phone?.trim() || null,
        locale: data.locale,
        status: "lead",
        tier: "free",
        utm_source: data.source,
        gdpr_consent: true,
        gdpr_consent_at: new Date().toISOString(),
        // Store extra context (message, challenge, etc.) in scores as JSON
        ...(Object.keys(metadata).length > 0 && { scores: metadata }),
      })
      .select("id")
      .single();

    if (insertError || !submission) {
      console.error("Lead capture insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to capture lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
