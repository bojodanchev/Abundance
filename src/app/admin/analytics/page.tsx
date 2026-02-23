import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import AnalyticsCharts from "./AnalyticsCharts";

interface FunnelData {
  total: number;
  completed: number;
  paid: number;
}

interface RevenuePoint {
  date: string;
  revenue: number;
}

interface IncomePoint {
  level: string;
  count: number;
}

interface EmailPoint {
  type: string;
  sent: number;
}

export interface AnalyticsData {
  funnel: FunnelData;
  revenueOverTime: RevenuePoint[];
  incomeDistribution: IncomePoint[];
  emailPerformance: EmailPoint[];
}

async function getAnalyticsData(): Promise<AnalyticsData> {
  const supabase = getSupabaseAdmin();

  // Default to 30d for initial server render
  const periodDate = new Date();
  periodDate.setDate(periodDate.getDate() - 30);
  const periodIso = periodDate.toISOString();

  const [totalRes, completedRes, paidRes, paymentsRes, incomeRes, emailRes] =
    await Promise.all([
      supabase
        .from("submissions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", periodIso),
      supabase
        .from("submissions")
        .select("id", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("created_at", periodIso),
      supabase
        .from("submissions")
        .select("id", { count: "exact", head: true })
        .eq("payment_status", "paid")
        .gte("created_at", periodIso),
      supabase
        .from("payments")
        .select("amount_cents, created_at")
        .in("status", ["completed", "paid"])
        .gte("created_at", periodIso),
      supabase
        .from("submissions")
        .select("income_level")
        .gte("created_at", periodIso),
      supabase
        .from("email_logs")
        .select("email_type")
        .gte("sent_at", periodIso),
    ]);

  // Funnel
  const funnel: FunnelData = {
    total: totalRes.count ?? 0,
    completed: completedRes.count ?? 0,
    paid: paidRes.count ?? 0,
  };

  // Revenue over time
  const revenueMap = new Map<string, number>();
  for (const p of paymentsRes.data ?? []) {
    const date = p.created_at?.split("T")[0];
    if (date) {
      revenueMap.set(date, (revenueMap.get(date) ?? 0) + p.amount_cents);
    }
  }
  const revenueOverTime: RevenuePoint[] = Array.from(revenueMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, cents]) => ({ date, revenue: cents / 100 }));

  // Income distribution
  const incomeCounts = new Map<string, number>();
  for (const s of incomeRes.data ?? []) {
    const level = s.income_level ?? "unknown";
    incomeCounts.set(level, (incomeCounts.get(level) ?? 0) + 1);
  }
  const incomeDistribution: IncomePoint[] = Array.from(
    incomeCounts.entries()
  ).map(([level, count]) => ({ level, count }));

  // Email performance
  const emailCounts = new Map<string, number>();
  for (const e of emailRes.data ?? []) {
    const type = e.email_type ?? "unknown";
    emailCounts.set(type, (emailCounts.get(type) ?? 0) + 1);
  }
  const emailPerformance: EmailPoint[] = Array.from(emailCounts.entries()).map(
    ([type, sent]) => ({ type, sent })
  );

  return { funnel, revenueOverTime, incomeDistribution, emailPerformance };
}

export default async function AnalyticsPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) redirect("/admin/login");

  const fallback: AnalyticsData = {
    funnel: { total: 0, completed: 0, paid: 0 },
    revenueOverTime: [],
    incomeDistribution: [],
    emailPerformance: [],
  };

  let data: AnalyticsData = fallback;
  try {
    data = await getAnalyticsData();
  } catch (error) {
    console.error("Analytics data error:", error);
  }

  return <AnalyticsCharts initialData={data} />;
}
