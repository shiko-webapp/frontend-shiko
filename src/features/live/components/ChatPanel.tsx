"use client";

import { Send } from "lucide-react";
import { ChatMessage, liveClassService } from "../services/liveClassService";
import { useState, useRef, useEffect } from "react";
import { ChatHub } from "../services/chatHub";

interface ChatPanelProps {
    liveClassId: number;
}

export default function ChatPanel({ liveClassId }: ChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const hubRef = useRef<ChatHub | null>(null);

    // Generera ett unikt ID per session
    const TEMP_USER_ID = useRef(`user-${Date.now()}`);
    const TEMP_USER_NAME = useRef(`TestUser-${Date.now()}`);

    useEffect(() => {
        // Hämta historiska meddelanden via REST
        liveClassService.getMessages(liveClassId)
            .then(setMessages)
            .catch(error => console.error("Failed to load messages:", error));

        // Anslut till SignalR hubben för realtidsuppdateringar
        const hub = new ChatHub();
        hubRef.current = hub;

        const connect = async () => {
            await hub.start();
            await hub.joinLiveClass(liveClassId, TEMP_USER_ID.current, TEMP_USER_NAME.current);

            // Lyssna på nya meddelanden från hubben
            hub.onReceiveMessage((msg) => {
                setMessages((prev) => [...prev, msg]);
            });
        }

        connect();

        return () => {
            hub.leaveLiveClass(liveClassId);
            hub.stop();
        };
    }, [liveClassId]);

    const handleSend = async () => {
        if (!newMessage.trim() || !hubRef.current) return;

        await hubRef.current.sendMessage(
            liveClassId,
            TEMP_USER_ID.current,
            TEMP_USER_NAME.current,
            newMessage
        );

        setNewMessage("");
    };

    const formatTime = (sentAt: string) => {
        return new Date(sentAt).toLocaleDateString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).toLowerCase();
    }

    return (
        <div className="flex flex-col w-sm bg-gray-100 rounded-3xl h-screen">
            <div className="mt-4 p-4">
                <h5>Live Chat</h5>
            </div>

            <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => {
                    const isOwn = msg.senderId === TEMP_USER_ID.current;
                    return (
                        <div key={msg.id}
                            className={`flex flex-col p-4 ${isOwn ? "items-end" : "items-start"}`} >
                            <p>{isOwn ? "You" : msg.senderName}</p>
                            <div className={`p-3 rounded-lg ${isOwn ? "bg-red-100" : "bg-gray-200"}`}>
                                <p className="text-xs text-gray-400">{msg.content}</p>
                            </div>
                            <p className="text-xs text-gray-400">
                                {formatTime(msg.sentAt)}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col item-end p-4 gap-2">
                {/* <div className="flex flex-col items-end">
                    <p className="text-sm">Hassan is Typing...</p>
                </div> */}
                <div className="relative w-full">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                        placeholder="Type message..."
                        className="bg-gray-200 p-3 rounded-lg focus:outline-none w-full" />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                        <button
                            onClick={handleSend}
                            className="rounded-md bg-red-500 p-2">
                            <Send className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}