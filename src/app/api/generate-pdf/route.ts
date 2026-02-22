import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generatePdfSchema } from "@/lib/schemas";

// TODO: Implement actual PDF generation with @react-pdf/renderer
// Install: npm install @react-pdf/renderer
// This route will:
// 1. Build a branded Bold Luxury PDF (black bg, gold accents, white text)
// 2. Free tier: profile type + radar chart placeholder + 1 teaser per area
// 3. Paid tier: full analysis + 90-day plan + deep dives
// 4. Upload to Cloudinary and return the URL

export async function POST(request: Request) {
  try {
    // --- Validate input ---
    const body = await request.json();
    const parsed = generatePdfSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { submission_id, tier } = parsed.data;

    // --- Fetch submission + analysis ---
    const { data: submission, error: fetchError } = await getSupabaseAdmin()
      .from("submissions")
      .select("*")
      .eq("id", submission_id)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      );
    }

    if (!submission.analysis_result) {
      return NextResponse.json(
        { success: false, error: "Analysis not yet completed" },
        { status: 400 }
      );
    }

    // TODO: Replace this placeholder with actual @react-pdf/renderer implementation
    // The PDF should follow the Bold Luxury design system:
    // - Background: #0A0A0A (near-black)
    // - Accent: #C9A84C (royal gold)
    // - Headings: Plus Jakarta Sans 700, white
    // - Body: Inter 400, #9CA3AF
    // - Scores: JetBrains Mono 700, gold
    //
    // Free tier content:
    //   - Cover page with name + profile type badge
    //   - Life audit radar chart visualization
    //   - 7 teaser insights (one line each)
    //   - CTA to upgrade for full report
    //
    // Paid tier content:
    //   - Everything in free tier
    //   - Full Human Design analysis
    //   - Full numerology analysis
    //   - Full astrological analysis
    //   - 90-day action plan (3 phases)
    //   - Deep dives per priority area

    const analysis = submission.analysis_result as Record<string, unknown>;

    return NextResponse.json({
      success: true,
      submission_id,
      tier,
      message: "PDF generation placeholder — @react-pdf/renderer implementation pending",
      preview: {
        profile: analysis.hd_type_profile,
        life_path: analysis.life_path_number,
        content_tier: tier === "free" ? "teaser_only" : "full_report",
      },
    });
  } catch (error) {
    console.error("Generate PDF error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
