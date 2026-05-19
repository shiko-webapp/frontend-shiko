import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.AUTHSERVICE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 401 }
    );
  }

  const data = await res.json();

  // 🔥 IMPORTANT: forward cookies from ASP.NET response
  const setCookie = res.headers.get("set-cookie");

  const response = NextResponse.json(data);

  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}