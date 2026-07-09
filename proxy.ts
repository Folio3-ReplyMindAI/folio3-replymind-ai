import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Every route that belongs to the logged-in app. Anything here is
// unreachable without a valid Supabase session — typing the URL directly
// included.
const PROTECTED = ["/dashboard", "/inbox", "/onboarding", "/rejected"];
const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  // Rebuilt whenever Supabase refreshes the session cookie, so the response
  // we return always carries the latest Set-Cookie header.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() (not getSession()) revalidates the token against Supabase's
  // auth server, so a revoked/expired session can't slip through.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const loggedIn = !!user;

  const { pathname } = request.nextUrl;

  if (!loggedIn && PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in — no reason to see the auth pages again.
  if (loggedIn && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/inbox", request.url));
  }

  return response;
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
