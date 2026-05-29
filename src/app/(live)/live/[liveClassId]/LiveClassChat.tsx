"use client";

import ChatPanel from "@/src/features/live/components/ChatPanel";
import VideoPlayer from "@/src/features/live/components/VideoPlayer";
import { ChatHub } from "@/src/features/live/services/chatHub";
import { ChatMessage, liveClassService, OnlineUser } from "@/src/features/live/services/liveClassService";
import { useEffect, useRef, useState } from "react";

interface liveClassProps {
    liveClassId: number;
    userId: string;
}

export default function LiveClassChat({ liveClassId, userId }: liveClassProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const hubRef = useRef<ChatHub | null>(null);

    useEffect(() => {
        const hub = new ChatHub();
        hubRef.current = hub;
        let cancelled = false;

        liveClassService.getMessages(liveClassId)
            .then((msgs) => { if (!cancelled) setMessages(msgs); })
            .catch(error => console.error("Failed to load messages:", error));

        const connectPromise = (async () => {
            try {
                await hub.start();
                if (cancelled) return;

                hub.onReceiveMessage((msg) => {
                    setMessages((prev) => [...prev, msg]);
                });

                hub.onPresenceUpdated((users) => {
                    setOnlineUsers(users);
                });

                await hub.joinLiveClass(liveClassId);
            } catch {
            }
        })();

        return () => {
            cancelled = true;
            connectPromise.finally(() => {
                hub.stop().catch(() => { });
            });
        };
    }, [liveClassId]);

    const handleSend = async (content: string) => {
        if (!hubRef.current) return;
        await hubRef.current.sendMessage(liveClassId, content);
    }
    return (
        <main className="flex items-center justify-center flex-col w-full h-dvh">
            <div className="flex gap-6">
                <VideoPlayer onlineUsers={onlineUsers} />
                <ChatPanel
                    messages={messages}
                    userId={userId}
                    onSend={handleSend}
                    liveClassId={liveClassId}
                />
            </div>
        </main>
    )
}