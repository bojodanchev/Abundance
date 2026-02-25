import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware(routing);

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isValidAdminToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes: JWT protection
  if (pathname.startsWith("/admin")) {
    // Allow login page and auth API routes through
    if (
      pathname === "/admin/login" ||
      pathname.startsWith("/api/admin/login") ||
      pathname.startsWith("/api/admin/logout")
    ) {
      return NextResponse.next();
    }

    const isValid = await isValidAdminToken(request);
    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // API routes for admin (not under /admin path but under /api/admin)
  if (pathname.startsWith("/api/admin")) {
    if (
      pathname.startsWith("/api/admin/login") ||
      pathname.startsWith("/api/admin/logout")
    ) {
      return NextResponse.next();
    }

    const isValid = await isValidAdminToken(request);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  // All other routes: i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/(bg|en)/:path*", "/admin/:path*", "/api/admin/:path*"],
};
