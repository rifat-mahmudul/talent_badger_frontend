import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(token)

  const url = request.nextUrl.clone();

  // If no token, redirect to home
  if (!token?.accessToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const role = token.role;

  // Role-based access control
  if (url.pathname.startsWith("/engineer") && role !== "engineer") {
    // Not engineer trying to access engineer route
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/account") && role !== "user") {
    // Not user trying to access account route
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/engineer/:path*"],
};

