"use client";

import { Send, UserCircle } from "lucide-react";
import { ChatMessage } from "../services/liveClassService";
import { useState } from "react";


interface ChatPanelProps {
    messages: ChatMessage[];
    userId: string;
    onSend: (content: string) => Promise<void>;
}

export default function ChatPanel({ messages, userId, onSend }: ChatPanelProps) {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        await onSend(newMessage);
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
                    const isOwn = userId === msg.senderId;

                    return (
                        <div
                            key={msg.id}
                            className={`flex flex-col p-4 ${isOwn ? "items-end" : "items-start"
                                }`}
                        >
                            {/* Header: namn + avatar på samma rad */}
                            <div
                                className={`flex items-center gap-2 mb-2 ${isOwn ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                {msg.senderImageUrl ? (
                                    <img
                                        src={msg.senderImageUrl}
                                        alt={msg.senderName}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <UserCircle className="h-8 w-8 text-gray-400" />
                                )}

                                <p className="text-sm font-medium">
                                    {isOwn ? "You" : msg.senderName}
                                </p>
                            </div>

                            {/* Meddelande */}
                            <div
                                className={`p-3 rounded-lg ${isOwn ? "bg-red-100" : "bg-gray-200"
                                    }`}
                            >
                                <p className="text-sm">{msg.content}</p>
                            </div>

                            {/* Tid */}
                            <p className="text-xs text-gray-400 mt-1">
                                {formatTime(msg.sentAt)}
                            </p>
                        </div>
                    );
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