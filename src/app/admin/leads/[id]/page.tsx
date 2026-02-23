import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import LeadDetail from "./LeadDetail";

export const metadata = {
  title: "Lead Detail | Admin | CODE: ABUNDANCE",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  const { id } = await params;

  let leadData: Record<string, unknown> | null = null;
  let emailLogs: Record<string, unknown>[] = [];
  let payments: Record<string, unknown>[] = [];

  try {
    const supabase = getSupabaseAdmin();

    const [submissionRes, emailLogsRes, paymentsRes] = await Promise.all([
      supabase.from("submissions").select("*").eq("id", id).single(),
      supabase
        .from("email_logs")
        .select("*")
        .eq("submission_id", id)
        .order("sent_at", { ascending: false }),
      supabase
        .from("payments")
        .select("*")
        .eq("submission_id", id)
        .order("created_at", { ascending: false }),
    ]);

    if (submissionRes.error || !submissionRes.data) {
      redirect("/admin/leads");
    }
    leadData = submissionRes.data as Record<string, unknown>;
    emailLogs = (emailLogsRes.data ?? []) as Record<string, unknown>[];
    payments = (paymentsRes.data ?? []) as Record<string, unknown>[];
  } catch (error) {
    // redirect() throws NEXT_REDIRECT which must propagate
    if (error && typeof error === "object" && "digest" in error) throw error;
    console.error("Lead detail error:", error);
    redirect("/admin/leads");
  }

  if (!leadData) {
    redirect("/admin/leads");
  }

  return (
    <LeadDetail
      lead={leadData}
      emailLogs={emailLogs}
      payments={payments}
    />
  );
}
