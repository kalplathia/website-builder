import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "admin_session";

function verifySession(sessionValue: string): boolean {
  try {
    const dotIndex = sessionValue.indexOf(".");
    if (dotIndex === -1) return false;

    const token = sessionValue.slice(0, dotIndex);
    const signature = sessionValue.slice(dotIndex + 1);

    if (!token || !signature) return false;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ADMIN_PASSWORD || "")
      .update(token)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Login page: redirect to dashboard if already authenticated
  if (path === "/admin/login") {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (session && verifySession(session)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // All other /admin routes: require authentication
  if (path.startsWith("/admin")) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!session || !verifySession(session)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
