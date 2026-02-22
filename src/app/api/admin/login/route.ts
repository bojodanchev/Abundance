import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { signAdminToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin not configured" },
        { status: 500 }
      );
    }

    const inputBuf = Buffer.from(String(password));
    const correctBuf = Buffer.from(adminPassword);

    if (
      inputBuf.length !== correctBuf.length ||
      !crypto.timingSafeEqual(inputBuf, correctBuf)
    ) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signAdminToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
