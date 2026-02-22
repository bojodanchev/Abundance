import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

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
  const sort = params.get("sort") || "created_at";
  const order = params.get("order") || "desc";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(params.get("limit") || "25", 10)));

  const supabase = getSupabaseAdmin();

  try {
    let query = supabase
      .from("submissions")
      .select(
        "id, user_name, user_email, user_phone, status, tier, income_level, commitment_level, locale, created_at, updated_at",
        { count: "exact" }
      );

    if (search) {
      query = query.or(
        `user_name.ilike.%${search}%,user_email.ilike.%${search}%`
      );
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (tier) {
      query = query.eq("tier", tier);
    }
    if (locale) {
      query = query.eq("locale", locale);
    }
    if (from) {
      query = query.gte("created_at", from);
    }
    if (to) {
      query = query.lte("created_at", to);
    }

    const ascending = order === "asc";
    query = query.order(sort, { ascending });

    const rangeFrom = (page - 1) * limit;
    const rangeTo = rangeFrom + limit - 1;
    query = query.range(rangeFrom, rangeTo);

    const { data, count, error } = await query;

    if (error) {
      console.error("Leads query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leads" },
        { status: 500 }
      );
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      leads: data ?? [],
      total,
      page,
      totalPages,
    });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
