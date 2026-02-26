import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("submissions")
    .select("status, analysis_result")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: data.status,
    ready: data.status === "completed" && data.analysis_result != null,
  });
}
