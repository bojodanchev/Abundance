import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";
import { buildNurtureEmail } from "@/app/api/send-email/route";

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

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

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

          // Send via SendGrid
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

  return NextResponse.json({ processed, errors });
}

// ----------------------------------------------------------------
// Query helpers
// ----------------------------------------------------------------

async function findEligible(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  step: { emailType: string; prevType: string | null; delayHours: number }
): Promise<string[]> {
  const cutoff = new Date(
    Date.now() - step.delayHours * 60 * 60 * 1000
  ).toISOString();

  if (step.prevType === "welcome") {
    // Special case: nurture_1 looks at submissions with email_sent=true
    // created 24h+ ago, with no nurture_1 log yet.
    const { data: submissions } = await supabase
      .from("submissions")
      .select("id")
      .eq("email_sent", true)
      .lte("created_at", cutoff);

    if (!submissions || submissions.length === 0) return [];

    const ids = submissions.map((s) => s.id as string);

    // Filter out those who already received this nurture email
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

  // General case: prevType was sent delayHours+ ago, emailType not yet sent
  const { data: prevLogs } = await supabase
    .from("email_logs")
    .select("submission_id")
    .eq("email_type", step.prevType!)
    .lte("created_at", cutoff);

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
