import { NextResponse, after } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submissionId = body.submission_id;

    if (!submissionId || typeof submissionId !== "string") {
      return NextResponse.json(
        { error: "Missing submission_id" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Only allow retrying errored submissions
    const { data: submission, error: fetchErr } = await supabase
      .from("submissions")
      .select("id, status")
      .eq("id", submissionId)
      .single();

    if (fetchErr || !submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (submission.status !== "error") {
      return NextResponse.json(
        { error: "Submission is not in error state" },
        { status: 409 }
      );
    }

    // Reset to pending
    await supabase
      .from("submissions")
      .update({ status: "pending", updated_at: new Date().toISOString() })
      .eq("id", submissionId);

    // Re-trigger analysis in background
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    after(async () => {
      try {
        const res = await fetch(`${baseUrl}/api/generate-analysis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.INTERNAL_API_KEY && {
              "x-internal-key": process.env.INTERNAL_API_KEY,
            }),
          },
          body: JSON.stringify({ submission_id: submissionId }),
        });
        if (!res.ok) {
          console.error("Retry analysis returned non-2xx:", res.status);
        }
      } catch (err) {
        console.error("Retry analysis fetch failed:", err);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Retry analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
