import * as signalR from "@microsoft/signalr";
import { chatEndpoints } from "@/src/services/endpoints/chatEndpoints";
import { ChatMessage } from "./liveClassService";


/**
 * Hanterar realtidskommunikation med backend via SignalR.
 * Ansluter till ChatHub i backend.
 */
export class ChatHub {
    private connection: signalR.HubConnection;

    // constructor() {
    //     this.connection = new signalR.HubConnectionBuilder()
    //         .withUrl(chatEndpoints.hub, {
    //             withCredentials: true
    //         })
    //         .withAutomaticReconnect()
    //         .build();
    // }

    constructor() {
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl(chatEndpoints.hub, {
            accessTokenFactory: async () => {
                const res = await fetch("/api/chat/token");
                if (!res.ok) return "";
                const data = await res.json();
                return data.accessToken;
            }
        })
        .withAutomaticReconnect()
        .build();
}

    //Öppnar WebSocket anslutningen till backend
    async start(): Promise<void>{
        try {
            await this.connection.start();
            console.log("SignalR connected to ChatHub");
        } catch (error) {
            console.error("SignalR connection failed:", error);
        }   
    }

    async stop(): Promise<void> {
        await this.connection.stop();
        console.log("Disconnected from ChatHub");
    }

    async joinLiveClass(
        liveClassId: number): Promise<void> 
    {
        try {
            // Anropar ChatHub.JoinLiveClass() i backend
            await this.connection.invoke("JoinLiveClass", liveClassId);
        } catch (error) {
            console.error("Error joining live class:", error);
        }   
    }

    async sendMessage(
        liveClassId: number, content: string) : Promise<void>
    {
        try {
            // Anropar ChatHub.SendMessage() i backend
            await this.connection.invoke("SendMessage", liveClassId, content);
        } catch (error) {
            console.error("Error sending message:", error);
        }
      
    }

    async leaveLiveClass(liveClassId: number) : Promise<void> {
        try {
            // Anropar ChatHub.LeaveLiveClass() i backend
            await this.connection.invoke("LeaveLiveClass", liveClassId);
        } catch (error) {
            console.error("Error leaving live class:", error);
        }     
    }

    // Lyssnar på "ReceiveMessage" från ChatHub.cs i backend
    onReceiveMessage(callback: (message: ChatMessage) => void) : void {
        this.connection.on("ReceiveMessage", callback);
    }

    onUserJoined(callback: (data: {
        userId: string;
        userName: string;
        joinedAt: string;
    }) => void) : void {
        this.connection.on("UserJoined", callback);
    }

    onUserLeft(callback: (data: {
        leavedAt: string;
    }) => void) : void {
        this.connection.on("UserLeft", callback);
    }
}