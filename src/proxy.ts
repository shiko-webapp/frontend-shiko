import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Routes that REQUIRE authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/feed",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Public routes bypass auth checks
  if (!isProtected) {
    return NextResponse.next();
  }

  const accessToken =
    req.cookies.get("accessToken")?.value;

  const refreshToken =
    req.cookies.get("refreshToken")?.value;

  // No refresh token → redirect to login
  if (!refreshToken) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // Valid access token → continue
  if (accessToken) {
    return NextResponse.next();
  }

  console.log("Refreshing session...");

  // Attempt session refresh
  const refreshRes = await fetch(
    `${process.env.AUTHSERVICE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  // Refresh failed
  if (!refreshRes.ok) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // Forward refreshed cookies
  const res = NextResponse.next();

  const cookies = refreshRes.headers.getSetCookie();

  for (const cookie of cookies) {
    res.headers.append("set-cookie", cookie);
  }

  return res;
}

export const config = {
  matcher: ["/:path*"],
};