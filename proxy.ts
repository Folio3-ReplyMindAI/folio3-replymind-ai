import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Every route that belongs to the logged-in app. Anything here is
// unreachable without the auth cookie — typing the URL directly included.
const PROTECTED = ["/dashboard", "/inbox", "/onboarding", "/rejected"];
const AUTH_PAGES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = request.cookies.get("rm_auth")?.value === "1";

  if (!loggedIn && PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in — no reason to see the auth pages again.
  if (loggedIn && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/inbox", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inbox/:path*",
    "/onboarding/:path*",
    "/rejected/:path*",
    "/login",
    "/register",
  ],
};
