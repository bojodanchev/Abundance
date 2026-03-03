import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";
import { buildNurtureEmail, buildWelcomeEmail } from "@/app/api/send-email/route";
import type { AnalysisResult } from "@/lib/schemas";

// Env: CRON_SECRET — Vercel injects this automatically for cron jobs.
// Must match the Authorization: Bearer <CRON_SECRET> header.

const NURTURE_SEQUENCE: {
  emailType: string;
  prevType: string | null;
  delayHours: number;
}[] = [
  // nurture_1: welcome sent 24h+ ago, nurture_1 not yet sent
  { emailType: "nurture_1", prevType: "welcome", delayHours: 24 },
  // nurture_2: nurture_1 sent 24h+ ago
  { emailType: "nurture_2", prevType: "nurture_1", delayHours: 24 },
  // nurture_3: nurture_2 sent 24h+ ago
  { emailType: "nurture_3", prevType: "nurture_2", delayHours: 24 },
  // nurture_4: nurture_3 sent 24h+ ago
  { emailType: "nurture_4", prevType: "nurture_3", delayHours: 24 },
  // nurture_5: nurture_4 sent 48h+ ago
  { emailType: "nurture_5", prevType: "nurture_4", delayHours: 48 },
];

export async function GET(request: Request) {
  // --- Verify cron secret ---
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const errors: string[] = [];
  let processed = 0;
  let welcomeRetried = 0;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  // --- Retry failed welcome emails ---
  // Catches completed submissions where the after() callback failed silently
  try {
    const { data: missed } = await supabase
      .from("submissions")
      .select("*")
      .eq("status", "completed")
      .eq("email_sent", false)
      .not("analysis_result", "is", null);

    if (missed && missed.length > 0) {
      for (const submission of missed) {
        try {
          const locale = (submission.locale as string) ?? "bg";
          const safeName = submission.user_name as string;
          const isBg = locale === "bg";
          const analysis = submission.analysis_result as AnalysisResult;
          const shortCode = (submission.short_code as string) ?? submission.id;
          const resultsUrl = `${baseUrl}/${locale}/results/${shortCode}`;

          const subject = isBg
            ? `${safeName}, твоята диагностика е готова ✦`
            : `${safeName}, your diagnostic is ready ✦`;
          const html = buildWelcomeEmail(submission, analysis, resultsUrl);

          await sendEmail({
            to: submission.user_email as string,
            subject,
            html,
          });

          await supabase.from("email_logs").insert({
            submission_id: submission.id,
            email_type: "welcome",
            locale,
          });

          await supabase
            .from("submissions")
            .update({ email_sent: true })
            .eq("id", submission.id);

          welcomeRetried++;
          processed++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          errors.push(`welcome_retry:${submission.id} ${msg}`);
        }
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`welcome_retry query failed: ${msg}`);
  }

  // --- Nurture sequence ---
  for (const step of NURTURE_SEQUENCE) {
    try {
      const recipientIds = await findEligible(supabase, step);

      for (const submissionId of recipientIds) {
        try {
          // Fetch full submission
          const { data: submission, error: fetchErr } = await supabase
            .from("submissions")
            .select("*")
            .eq("id", submissionId)
            .single();

          if (fetchErr || !submission) {
            errors.push(`${step.emailType}:${submissionId} fetch failed`);
            continue;
          }

          // Build email
          const { subject, html } = buildNurtureEmail(
            submission,
            step.emailType,
            baseUrl
          );

          // Send via SMTP
          await sendEmail({
            to: submission.user_email as string,
            subject,
            html,
          });

          // Log to email_logs
          await supabase.from("email_logs").insert({
            submission_id: submissionId,
            email_type: step.emailType,
            locale: (submission.locale as string) ?? "bg",
          });

          processed++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          errors.push(`${step.emailType}:${submissionId} ${msg}`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${step.emailType} query failed: ${msg}`);
    }
  }

  return NextResponse.json({ processed, welcomeRetried, errors });
}

// ----------------------------------------------------------------
// Query helpers
// ----------------------------------------------------------------

async function findEligible(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  step: { emailType: string; prevType: string | null; delayHours: number }
): Promise<string[]> {
  if (!step.prevType) return [];

  const cutoff = new Date(
    Date.now() - step.delayHours * 60 * 60 * 1000
  ).toISOString();

  // General case: previous email was sent delayHours+ ago, current email not yet sent.
  const { data: prevLogs } = await supabase
    .from("email_logs")
    .select("submission_id")
    .eq("email_type", step.prevType)
    .lte("sent_at", cutoff);

  if (!prevLogs || prevLogs.length === 0) return [];

  const ids = prevLogs.map((r) => r.submission_id as string);

  const { data: alreadySent } = await supabase
    .from("email_logs")
    .select("submission_id")
    .eq("email_type", step.emailType)
    .in("submission_id", ids);

  const sentSet = new Set(
    (alreadySent ?? []).map((r) => r.submission_id as string)
  );
  return ids.filter((id) => !sentSet.has(id));
}
