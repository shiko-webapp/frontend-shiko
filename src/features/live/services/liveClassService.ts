import { chatEndpoints } from "@/src/services/endpoints/chatEndpoints";

export interface ChatMessage {
    id: number;
    liveClassChatId: number;
    senderId: string;
    senderName: string;
    content: string;
    sentAt: string; 
}

// Kommunicerar med ChatApi i Azure via HTTP/REST.
export const liveClassService = {
    async getMessages(liveClassId: number) : Promise<ChatMessage[]>{
        const response = await fetch(chatEndpoints.getMessages(liveClassId));

        if (!response.ok){
            throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        return response.json();
    }
}