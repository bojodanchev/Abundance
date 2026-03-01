import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isUUID } from "@/lib/short-code";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  const id = searchParams.get("id");

  if (!ref && !id) {
    return NextResponse.json(
      { error: "Missing ref or id parameter" },
      { status: 400 }
    );
  }

  let query = getSupabaseAdmin()
    .from("submissions")
    .select("id, status, analysis_result");

  if (id) {
    query = query.eq("id", id);
  } else if (ref && isUUID(ref)) {
    query = query.eq("id", ref);
  } else if (ref) {
    query = query.eq("short_code", ref);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: data.status,
    ready: data.status === "completed" && data.analysis_result != null,
    submissionId: data.id,
  });
}
