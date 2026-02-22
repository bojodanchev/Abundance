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

  return (
    <LeadDetail
      lead={submissionRes.data}
      emailLogs={emailLogsRes.data ?? []}
      payments={paymentsRes.data ?? []}
    />
  );
}
