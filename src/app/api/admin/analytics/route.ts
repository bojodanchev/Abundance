import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

function getPeriodDate(period: string): string | null {
  const now = new Date();
  switch (period) {
    case "7d":
      now.setDate(now.getDate() - 7);
      return now.toISOString();
    case "30d":
      now.setDate(now.getDate() - 30);
      return now.toISOString();
    case "90d":
      now.setDate(now.getDate() - 90);
      return now.toISOString();
    case "all":
      return null;
    default:
      now.setDate(now.getDate() - 30);
      return now.toISOString();
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = request.nextUrl.searchParams.get("period") || "30d";
  const periodDate = getPeriodDate(period);

  const supabase = getSupabaseAdmin();

  try {
    // Build queries with optional period filter
    let totalQuery = supabase
      .from("submissions")
      .select("id", { count: "exact", head: true });
    let completedQuery = supabase
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed");
    let paidQuery = supabase
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("payment_status", "paid");
    let paymentsQuery = supabase
      .from("payments")
      .select("amount_cents, created_at")
      .in("status", ["completed", "paid"]);
    let incomeQuery = supabase
      .from("submissions")
      .select("income_level");
    let emailQuery = supabase
      .from("email_logs")
      .select("email_type");

    if (periodDate) {
      totalQuery = totalQuery.gte("created_at", periodDate);
      completedQuery = completedQuery.gte("created_at", periodDate);
      paidQuery = paidQuery.gte("created_at", periodDate);
      paymentsQuery = paymentsQuery.gte("created_at", periodDate);
      incomeQuery = incomeQuery.gte("created_at", periodDate);
      emailQuery = emailQuery.gte("sent_at", periodDate);
    }

    const [totalRes, completedRes, paidRes, paymentsRes, incomeRes, emailRes] =
      await Promise.all([
        totalQuery,
        completedQuery,
        paidQuery,
        paymentsQuery,
        incomeQuery,
        emailQuery,
      ]);

    // Funnel
    const funnel = {
      total: totalRes.count ?? 0,
      completed: completedRes.count ?? 0,
      paid: paidRes.count ?? 0,
    };

    // Revenue over time - group by date
    const revenueMap = new Map<string, number>();
    for (const p of paymentsRes.data ?? []) {
      const date = p.created_at?.split("T")[0];
      if (date) {
        revenueMap.set(date, (revenueMap.get(date) ?? 0) + p.amount_cents);
      }
    }
    const revenueOverTime = Array.from(revenueMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, cents]) => ({ date, revenue: cents / 100 }));

    // Income distribution - count by level
    const incomeCounts = new Map<string, number>();
    for (const s of incomeRes.data ?? []) {
      const level = s.income_level ?? "unknown";
      incomeCounts.set(level, (incomeCounts.get(level) ?? 0) + 1);
    }
    const incomeDistribution = Array.from(incomeCounts.entries()).map(
      ([level, count]) => ({ level, count })
    );

    // Email performance - count by type
    const emailCounts = new Map<string, number>();
    for (const e of emailRes.data ?? []) {
      const type = e.email_type ?? "unknown";
      emailCounts.set(type, (emailCounts.get(type) ?? 0) + 1);
    }
    const emailPerformance = Array.from(emailCounts.entries()).map(
      ([type, sent]) => ({ type, sent })
    );

    return NextResponse.json({
      funnel,
      revenueOverTime,
      incomeDistribution,
      emailPerformance,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
