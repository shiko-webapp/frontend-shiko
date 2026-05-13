import { chatEndpoints } from "@/src/services/endpoints/chatEndpoints";

export interface ChatMessage {
    id: number;
    liveClassChatId: number;
    senderId: string;
    senderName: string;
    content: string;
    sentAt: string; 
}

export const liveClassService = {
    async getMessages(liveClassId: number): Promise<ChatMessage[]> {

        const response = await fetch(chatEndpoints.getMessages(liveClassId), {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch messages: ${response.status}`);
        }

        return response.json();
    }
};