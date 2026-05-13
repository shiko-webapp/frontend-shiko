import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backendRes = await fetch(
    `${process.env.AUTHSERVICE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    },
  );

  const body = await backendRes.json();

  const res = NextResponse.json(body);

  const cookies = backendRes.headers.getSetCookie();

  for (const cookie of cookies) {
    res.headers.append("set-cookie", cookie);
  }

  return res;
}
