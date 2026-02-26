import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import ResultsClient, { type ResultsData } from "./ResultsClient";
import PendingResults from "./PendingResults";
import type { AnalysisResult } from "@/lib/schemas";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ResultsPage({ params }: Props) {
  const { id } = await params;

  const { data: submission, error } = await getSupabaseAdmin()
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !submission) {
    notFound();
  }

  const analysis = submission.analysis_result as AnalysisResult | null;

  // If analysis hasn't completed yet, show polling state
  if (!analysis) {
    return <PendingResults submissionId={id} />;
  }

  const scores = (submission.scores as Record<string, number>) ?? {};
  const priorities = (submission.priority_top3 as string[]) ?? [];

  const resultsData: ResultsData = {
    name: submission.user_name ?? "",
    hdType: analysis.hd_type_profile,
    hdStrategy: analysis.hd_strategy,
    lifePathNumber: analysis.life_path_number,
    scores,
    priorities,
    teaserInsights: analysis.teaser_insights,
    submissionId: id,
    email: submission.user_email ?? "",
  };

  return <ResultsClient data={resultsData} />;
}
