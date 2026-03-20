// middleware.ts  (place at project root, next to next.config.js)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight route protection.
 * Firebase auth state lives client-side, so we can only do a cookie check here.
 * The real auth guard (useRequireAuth) runs client-side inside /dashboard.
 * This middleware prevents unauthenticated users from even receiving the HTML.
 *
 * Firebase sets a "__session" cookie when using firebase-admin SSR,
 * or you can set a custom "auth_token" cookie on sign-in.
 * For a pure client-side Firebase setup this is a soft guard —
 * the hard guard is useRequireAuth() in the page itself.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Check for Firebase session cookie (set by your auth flow)
    const session =
      request.cookies.get("__session")?.value ||
      request.cookies.get("auth_token")?.value;

    if (!session) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Redirect signed-in users away from /signin and /register root
  // (soft — real check is client-side)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};