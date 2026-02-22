import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generatePdfSchema } from "@/lib/schemas";
import type { AnalysisResult, LifeArea } from "@/lib/schemas";
import { AbundanceReport } from "@/lib/pdf/AbundanceReport";
import type { PdfSubmission } from "@/lib/pdf/AbundanceReport";

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

    // --- Build typed submission for PDF ---
    const analysis = submission.analysis_result as AnalysisResult;
    const pdfSubmission: PdfSubmission = {
      id: submission.id,
      user_name: submission.user_name,
      user_email: submission.user_email,
      scores: submission.scores as Record<LifeArea, number>,
      priority_top3: submission.priority_top3 as LifeArea[],
      analysis_result: analysis,
    };

    // --- Generate PDF ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(AbundanceReport, {
      submission: pdfSubmission,
      tier,
    }) as any;

    const buffer = await renderToBuffer(element);

    const filename = `abundance-report-${tier}.pdf`;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-cache",
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
