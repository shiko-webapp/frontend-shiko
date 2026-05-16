import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken) {
    return NextResponse.next();
  }

  console.log("Refreshing session...");

  const refreshRes = await fetch(
    `${process.env.AUTHSERVICE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    },
  );

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = NextResponse.redirect(req.url);

  const cookies = refreshRes.headers.getSetCookie();

  for (const cookie of cookies) {
    res.headers.append("set-cookie", cookie);
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
