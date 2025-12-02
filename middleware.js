import { NextResponse } from "next/server";

export function middleware(req) {
  const authCookie = req.cookies.get("sb-mphdehnghaqodtmiesja-auth-token");

  // If no token and trying to access a protected route → redirect to login
  if (!authCookie && req.nextUrl.pathname.startsWith("/")) {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!auth).*)", // protect everything except /auth/*
  ],
};
