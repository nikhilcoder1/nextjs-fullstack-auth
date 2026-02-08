import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const publicPaths = [
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword",
    "/resetpassword",
  ];

  // Handle root route explicitly
  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isPublicPath = publicPaths.includes(path);

  // logged-in user should not access auth pages
  if (isPublicPath && token && path !== "/resetpassword") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // not logged-in user accessing protected route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword",
    "/resetpassword",
  ],
};