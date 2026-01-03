import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl.clone();


  if (!token?.accessToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const role = token.role;

  if (url.pathname.startsWith("/engineer") && role !== "engineer") {
  
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/account") && role !== "user") {

    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/engineer/:path*"],
};

