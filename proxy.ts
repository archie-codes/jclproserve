import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Protect all /admin routes, EXCEPT the custom login page
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    // 2. Look for the secure session cookie we set when they log in
    const session = req.cookies.get("jcl_admin_session");

    // 3. If they don't have the cookie, redirect them to the beautiful login UI
    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 4. If they have the cookie (or are on a public page), let them through seamlessly
  return NextResponse.next();
}

export const config = {
  // Apply this middleware to the admin folder
  matcher: ["/admin/:path*"],
};
