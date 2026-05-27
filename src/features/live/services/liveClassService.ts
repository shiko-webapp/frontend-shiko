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

export interface LiveClass {
    id: number;
    liveClassId: number;
    createdAt: string;
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
    },

    async getLiveClasses(): Promise<LiveClass[]> {
        const response = await fetch(`/api/chat/live-classes`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch live classes: ${response.status}`);
        }

        return response.json();
    }
};