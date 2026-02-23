import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import DashboardContent from "./DashboardContent";

async function getDashboardStats() {
  const supabase = getSupabaseAdmin();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [
    totalRes,
    todayRes,
    monthRes,
    completedRes,
    revenueRes,
    emailsRes,
    pendingRes,
    processingRes,
    errorRes,
    recentRes,
  ] = await Promise.all([
    supabase.from("submissions").select("id", { count: "exact", head: true }),
    supabase.from("submissions").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
    supabase.from("submissions").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("payments").select("amount_cents").eq("status", "paid"),
    supabase.from("email_logs").select("id", { count: "exact", head: true }),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "processing"),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "error"),
    supabase
      .from("submissions")
      .select("id, user_name, user_email, status, tier, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const totalLeads = totalRes.count ?? 0;
  const completedCount = completedRes.count ?? 0;

  return {
    totalLeads,
    leadsToday: todayRes.count ?? 0,
    leadsThisMonth: monthRes.count ?? 0,
    conversionRate: totalLeads > 0 ? Math.round((completedCount / totalLeads) * 10000) / 100 : 0,
    totalRevenue:
      (revenueRes.data ?? []).reduce(
        (sum: number, p: { amount_cents: number }) => sum + p.amount_cents,
        0
      ) / 100,
    emailsSent: emailsRes.count ?? 0,
    statusBreakdown: {
      pending: pendingRes.count ?? 0,
      processing: processingRes.count ?? 0,
      completed: completedCount,
      error: errorRes.count ?? 0,
    },
    recentLeads: recentRes.data ?? [],
  };
}

export default async function AdminDashboardPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) redirect("/admin/login");

  try {
    const stats = await getDashboardStats();
    return <DashboardContent stats={stats} />;
  } catch (error) {
    console.error("Dashboard stats error:", error);
    const fallbackStats = {
      totalLeads: 0,
      leadsToday: 0,
      leadsThisMonth: 0,
      conversionRate: 0,
      totalRevenue: 0,
      emailsSent: 0,
      statusBreakdown: { pending: 0, processing: 0, completed: 0, error: 0 },
      recentLeads: [],
    };
    return <DashboardContent stats={fallbackStats} />;
  }
}
