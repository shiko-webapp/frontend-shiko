const BASE_URL = process.env.NEXT_PUBLIC_LIVE_CHAT_API_URL || "https://localhost:4443";

export const chatEndpoints = {
    getMessages: (liveClassId: number) => 
        `${BASE_URL}/api/chat/live-class/${liveClassId}/messages`,

    hub: `${BASE_URL}/hubs/chat`,
}