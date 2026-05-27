import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_CHAT_API_URL}/api/chat/live-classes`, {
        headers: { Accept: "application/json" },
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch live classes" },
            { status: res.status }
        );
    }

    return NextResponse.json(await res.json());
}