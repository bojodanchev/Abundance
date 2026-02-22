import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const search = params.get("search") || "";
  const status = params.get("status") || "";
  const tier = params.get("tier") || "";
  const locale = params.get("locale") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const supabase = getSupabaseAdmin();

  try {
    let query = supabase
      .from("submissions")
      .select(
        "user_name, user_email, user_phone, status, tier, income_level, commitment_level, locale, birth_date, utm_source, utm_medium, utm_campaign, created_at"
      );

    if (search) {
      query = query.or(
        `user_name.ilike.%${search}%,user_email.ilike.%${search}%`
      );
    }
    if (status) query = query.eq("status", status);
    if (tier) query = query.eq("tier", tier);
    if (locale) query = query.eq("locale", locale);
    if (from) query = query.gte("created_at", from);
    if (to) query = query.lte("created_at", to);

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Export query error:", error);
      return NextResponse.json({ error: "Failed to export" }, { status: 500 });
    }

    const rows = data ?? [];
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Status",
      "Tier",
      "Income Level",
      "Commitment",
      "Locale",
      "Birth Date",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Created At",
    ];

    const csvLines = [
      headers.join(","),
      ...rows.map((r) =>
        [
          escapeCsvField(r.user_name ?? ""),
          escapeCsvField(r.user_email ?? ""),
          escapeCsvField(r.user_phone ?? ""),
          escapeCsvField(r.status ?? ""),
          escapeCsvField(r.tier ?? ""),
          escapeCsvField(r.income_level ?? ""),
          escapeCsvField(String(r.commitment_level ?? "")),
          escapeCsvField(r.locale ?? ""),
          escapeCsvField(r.birth_date ?? ""),
          escapeCsvField(r.utm_source ?? ""),
          escapeCsvField(r.utm_medium ?? ""),
          escapeCsvField(r.utm_campaign ?? ""),
          escapeCsvField(r.created_at ?? ""),
        ].join(",")
      ),
    ];

    const csv = csvLines.join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err) {
    console.error("Export API error:", err);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
