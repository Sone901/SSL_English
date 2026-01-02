import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/auth/signin",
  "/api/auth/callback",
  "/api/auth/error",
  "/api/auth/register",
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  const session = await auth()
  
  if (!session) {
    // Redirect to sign-in with callback URL to return to original page
    const callbackUrl = encodeURIComponent(pathname + request.nextUrl.search)
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
