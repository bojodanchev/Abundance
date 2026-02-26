import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { chatCompletion } from "@/lib/openai";
import { generateAnalysisSchema, type AnalysisResult } from "@/lib/schemas";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/diagnostic-knowledge";

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

    // --- Build specialist prompts with pre-calculated data ---
    const scores = submission.scores as Record<string, number>;
    const priorities = (submission.priority_top3 as string[]) ?? [];
    const goals = (submission.goals as Record<string, number>) ?? {};
    const locale = submission.locale ?? "bg";

    const systemPrompt = buildSystemPrompt(locale);
    const userPrompt = buildUserPrompt(submission, scores, priorities, goals);

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
