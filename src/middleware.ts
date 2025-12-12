// import { getToken } from "next-auth/jwt";
// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const url = request.nextUrl.clone();

//   // If no token, redirect to home
//   if (!token?.accessToken) {
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   const role = token.role;

//   // Role-based access control
//   if (url.pathname.startsWith("/engineer") && role !== "engineer") {
//     // Not engineer trying to access engineer route
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   if (url.pathname.startsWith("/account") && role !== "user") {
//     // Not user trying to access account route
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account/:path*", "/engineer/:path*"],
// };



// import { getToken } from "next-auth/jwt";
// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const url = request.nextUrl;

//   // If no token → redirect
//   if (!token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const role = token.role as string;

//   // Engineer protected routes
//   if (url.pathname.startsWith("/engineer") && role !== "engineer") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Account protected routes (normal users)
//   if (url.pathname.startsWith("/account") && !["user", "client"].includes(role)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account/:path*", "/engineer/:path*"],
// };



import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(

  function middleware(req) {
    const token = req.nextauth.token;
    const role = token?.role;
    const path = req.nextUrl.pathname;
 

    // User dashboard protection
    if (path.startsWith("/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Contractor/Service Provider dashboard protection
    if (path.startsWith("/engineer") && role !== "engineer") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
     
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/account/:path*",
    "/engineer:path*",
  ],
};