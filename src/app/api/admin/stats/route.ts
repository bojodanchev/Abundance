import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  try {
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
    const leadsToday = todayRes.count ?? 0;
    const leadsThisMonth = monthRes.count ?? 0;
    const completedCount = completedRes.count ?? 0;
    const conversionRate = totalLeads > 0 ? Math.round((completedCount / totalLeads) * 10000) / 100 : 0;

    const totalRevenue = (revenueRes.data ?? []).reduce(
      (sum: number, p: { amount_cents: number }) => sum + p.amount_cents,
      0
    ) / 100;

    const emailsSent = emailsRes.count ?? 0;

    const statusBreakdown = {
      pending: pendingRes.count ?? 0,
      processing: processingRes.count ?? 0,
      completed: completedCount,
      error: errorRes.count ?? 0,
    };

    const recentLeads = recentRes.data ?? [];

    return NextResponse.json({
      totalLeads,
      leadsToday,
      leadsThisMonth,
      conversionRate,
      totalRevenue,
      emailsSent,
      statusBreakdown,
      recentLeads,
    });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
