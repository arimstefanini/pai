import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals, API routes and static assets to use their default caching
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Force browsers to revalidate HTML pages so mobile clients pick up updates.
  // This keeps long-lived asset caching (fingerprinted) intact.
  res.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");

  return res;
}

export const config = {
  matcher: "/:path*",
};
