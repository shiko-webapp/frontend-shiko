import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const liveClassId = req.nextUrl.searchParams.get("liveClassId");

  if (!liveClassId) {
    return NextResponse.json(
      { message: "liveClassId is required" },
      { status: 400 }
    );
  }

  const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_CHAT_API_URL}/api/chat/live-class/${liveClassId}/messages`,
    {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch messages" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}