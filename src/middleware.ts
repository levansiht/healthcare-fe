import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route categories and important paths
  const AUTH_PAGES = ["/auth/login", "/auth/register"];
  const USER_PROTECTED_ROUTES = ["/dashboard", "/profile", "/workouts", "/schedule"];
  const ADMIN_ROOT_PATH = "/admin"; // Matches /admin, /admin/users, etc.
  const HOME_PATH = "/";

  const token = request.cookies.get("auth-token")?.value;
  const role = request.cookies.get("role-user")?.value;

  const isAuthPage = AUTH_PAGES.some((route) => pathname.startsWith(route));
  const isUserProtectedRoute = USER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith(ADMIN_ROOT_PATH);
  const isHomePage = pathname === HOME_PATH;


  if (!token) {

    if (isUserProtectedRoute || isAdminRoute) {
      const loginUrl = new URL("/auth/login", request.url);

      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }


  if (isAuthPage) {
    if (role === "Admin") {
      return NextResponse.redirect(new URL(ADMIN_ROOT_PATH, request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAdminRoute) {
    if (role === "Admin") {
      return NextResponse.next(); // Admin is allowed
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  if (isHomePage) {
    if (role === "Admin") {
      return NextResponse.redirect(new URL(ADMIN_ROOT_PATH, request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  if (isUserProtectedRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};