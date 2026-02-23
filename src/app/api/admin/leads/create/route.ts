import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      user_name,
      user_email,
      user_phone,
      locale,
      income_level,
      commitment_level,
      birth_date,
      birth_time,
      birth_time_unknown,
      birth_city,
      birth_country,
      scores,
      tier,
      status,
    } = body;

    if (!user_name || !user_email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const insertData: Record<string, unknown> = {
      user_name: user_name.trim(),
      user_email: user_email.trim().toLowerCase(),
      locale: locale || "bg",
      status: status || "pending",
      tier: tier || "free",
      gdpr_consent: true,
      gdpr_consent_at: new Date().toISOString(),
    };

    if (user_phone) insertData.user_phone = user_phone.trim();
    if (income_level) insertData.income_level = income_level;
    if (commitment_level) insertData.commitment_level = commitment_level;
    if (birth_date) insertData.birth_date = birth_date;
    if (birth_time) insertData.birth_time = birth_time;
    if (birth_time_unknown !== undefined)
      insertData.birth_time_unknown = birth_time_unknown;
    if (birth_city) insertData.birth_city = birth_city.trim();
    if (birth_country) insertData.birth_country = birth_country.trim();
    if (scores) insertData.scores = scores;

    const { data, error } = await supabase
      .from("submissions")
      .insert(insertData)
      .select("id")
      .single();

    if (error) {
      console.error("Create lead error:", error);
      return NextResponse.json(
        { error: "Failed to create lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Create lead error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
