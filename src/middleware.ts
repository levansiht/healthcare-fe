import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/auth/login", "/auth/register"];
  const protectedRoutes = ["/dashboard", "/profile", "/workouts", "/schedule"];
  const adminRoutes = ["/admin"];

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  const token = request.cookies.get("auth-token")?.value;
  const role = request.cookies.get("role-user")?.value;

  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Restrict admin routes to users with "Admin" role
  if (isAdminRoute && role !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect authenticated users away from login/register pages
  if (
    token &&
    !isPublicRoute &&
    (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};