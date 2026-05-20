export interface ChatMessage {
    id: number;
    liveClassChatId: number;
    senderId: string;
    senderName: string;
    senderImageUrl: string;
    content: string;
    sentAt: string; 
}

export interface OnlineUser {
    connectionId: string;
    userId: string;
    userName: string;
    userImageUrl: string;
}

export const liveClassService = {
    async getMessages(liveClassId: number): Promise<ChatMessage[]> {
        const response = await fetch(
            `/api/chat/messages?liveClassId=${liveClassId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch messages: ${response.status}`);
        }

        return response.json();
    }
};