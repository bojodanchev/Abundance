import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { chatCompletion } from "@/lib/openai";
import { generateAnalysisSchema, type AnalysisResult } from "@/lib/schemas";

export const maxDuration = 300; // Allow up to 5min for OpenAI response

export async function POST(request: Request) {
  try {
    // --- Auth: internal API key check ---
    const internalApiKey = process.env.INTERNAL_API_KEY;
    if (internalApiKey) {
      const providedKey = request.headers.get("x-internal-key");
      if (providedKey !== internalApiKey) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    // --- Validate input ---
    const body = await request.json();
    const parsed = generateAnalysisSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { submission_id } = parsed.data;

    // --- Fetch submission ---
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

    // --- Update status to processing ---
    await getSupabaseAdmin()
      .from("submissions")
      .update({ status: "processing" })
      .eq("id", submission_id);

    // --- Build OpenAI prompt ---
    const scores = submission.scores as Record<string, number>;
    const priorities = (submission.priority_top3 as string[]) ?? [];
    const goals = (submission.goals as Record<string, number>) ?? {};
    const locale = submission.locale ?? "bg";

    const scoresSummary = Object.entries(scores)
      .map(([area, score]) => `- ${area}: ${score}/10`)
      .join("\n");

    const prioritiesSummary = priorities.join(", ");
    const goalsSummary = Object.entries(goals)
      .map(([area, target]) => `- ${area}: current ${scores[area] ?? "?"}/10 → goal ${target}/10`)
      .join("\n");

    const birthInfo = [
      `Date of birth: ${submission.birth_date ?? "unknown"}`,
      submission.birth_time_unknown
        ? "Birth time: unknown"
        : `Birth time: ${submission.birth_time ?? "not provided"}`,
      `Birth city: ${submission.birth_city ?? "not provided"}`,
      `Birth country: ${submission.birth_country ?? "not provided"}`,
    ].join("\n");

    const systemPrompt = `You are CODE: ABUNDANCE AI Diagnostic Agent. Generate a comprehensive personal analysis combining Human Design type, Life Path numerology, and astrological insights. The user speaks ${locale === "bg" ? "Bulgarian" : "English"}. Respond in that language.

You MUST respond with valid JSON matching this exact structure:
{
  "hd_type_profile": "e.g. Generator 5/1",
  "hd_strategy": "e.g. To Respond",
  "life_path_number": "e.g. 8",
  "astro_triad": "e.g. Sun in Aries, Moon in Taurus, Ascendant Libra",
  "teaser_insights": {
    "finances": "One compelling teaser sentence about their financial pattern",
    "business": "One compelling teaser sentence about their business potential",
    "health": "One compelling teaser sentence about their health blueprint",
    "mental": "One compelling teaser sentence about their mental wellbeing",
    "romantic": "One compelling teaser sentence about their relationship dynamics",
    "social": "One compelling teaser sentence about their social connections",
    "mission": "One compelling teaser sentence about their life mission"
  },
  "full_analysis": {
    "hd_analysis_text": "Detailed Human Design analysis (3-4 paragraphs)",
    "life_path_analysis_text": "Detailed numerology analysis (3-4 paragraphs)",
    "astro_analysis_text": "Detailed astrological analysis (3-4 paragraphs)",
    "phase1_plan": "Days 1-30 action plan with specific steps",
    "phase2_plan": "Days 31-60 action plan with specific steps",
    "phase3_plan": "Days 61-90 action plan with specific steps"
  }
}

Make each teaser insight intriguing enough to motivate upgrading to the full report. The full analysis should be thorough, personalized, and actionable. The 90-day plan phases should directly address the user's top 3 priorities.`;

    const userPrompt = `Analyze this person:

Name: ${submission.user_name}

LIFE AUDIT SCORES (1-10):
${scoresSummary}

TOP 3 PRIORITIES: ${prioritiesSummary}

GOALS (90-day targets):
${goalsSummary || "Not specified"}

BIRTH DATA:
${birthInfo}

COMMITMENT LEVEL: ${submission.commitment_level}
INCOME LEVEL: ${submission.income_level}

Generate a full diagnostic analysis including Human Design type, Life Path number, astrological triad, teaser insights for all 7 areas, full detailed analysis texts, and a 3-phase 90-day action plan.`;

    // --- Call OpenAI ---
    const responseText = await chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      {
        model: "gpt-5-mini",
        max_completion_tokens: 16000,
        response_format: { type: "json_object" },
      }
    );

    let analysisResult: AnalysisResult;
    try {
      // Strip markdown code fences if present (e.g. ```json ... ```)
      let cleanText = responseText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
      }
      analysisResult = JSON.parse(cleanText);
    } catch {
      console.error("Failed to parse OpenAI response:", responseText.slice(0, 500));
      await getSupabaseAdmin()
        .from("submissions")
        .update({ status: "error" })
        .eq("id", submission_id);

      return NextResponse.json(
        { success: false, error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // --- Save analysis result ---
    const { error: updateError } = await getSupabaseAdmin()
      .from("submissions")
      .update({
        analysis_result: analysisResult,
        status: "completed",
      })
      .eq("id", submission_id);

    if (updateError) {
      console.error("Failed to update submission with analysis:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to save analysis" },
        { status: 500 }
      );
    }

    // --- Trigger welcome email (fire-and-forget) ---
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INTERNAL_API_KEY && {
          "x-internal-key": process.env.INTERNAL_API_KEY,
        }),
      },
      body: JSON.stringify({
        submission_id,
        email_type: "welcome",
      }),
    }).catch((err) => {
      console.error("Failed to trigger welcome email:", err);
    });

    return NextResponse.json({
      success: true,
      submission_id,
      analysis: analysisResult,
    });
  } catch (error) {
    console.error("Generate analysis error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
