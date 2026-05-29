"use client";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef, useState, SubmitEvent } from "react";
import { IChatMessage } from "../models/IChatMessage";

interface IUseChatHookProps {
  chatId: string;
  userId: string;
}

export const useChat = ({ chatId, userId }: IUseChatHookProps) => {
  const [currentUserId, setCurrentUserId] = useState(userId);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [message, setMessage] = useState("");

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const chatUrl = process.env.NEXT_PUBLIC_INSTRUCTOR_CHAT_URL;
    if (!chatUrl) {
      console.error("ENV file is not defined in .env");
      return;
    }

    setCurrentUserId(userId);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(chatUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.None)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.on("LoadMessages", (loadedMessages: IChatMessage[]) => {
      setMessages(loadedMessages);
    });

    connection.on("ReceiveMessage", (receivedMessage: IChatMessage) => {
      setMessages((current) => {
        const alreadyExists = current.some(
          (existingMessage) =>
            existingMessage.messageId === receivedMessage.messageId
        );
        if (alreadyExists) return current;
        return [...current, receivedMessage];
      });
    });

    connection.on("EndStream", () => {
      setMessages([]);
      setIsConnected(false);
    });

    connection.onreconnected(async () => {
      try {
        await connection.invoke("JoinChatStream", chatId);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    });

    connection.onreconnecting(() => setIsConnected(false));
    connection.onclose(() => setIsConnected(false));

    connection
      .start()
      .then(async () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
          await connection.invoke("JoinChatStream", chatId);
          setIsConnected(true);
        }
      })
      .catch(() => {
        setIsConnected(false);
      });
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => {});
        connectionRef.current = null;
      }
    };
  }, [chatId, userId]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const sendMessage = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimedMessage = message.trim();

    if (!trimedMessage) return;

    if (!connectionRef.current || !isConnected) {
      setMessages((current) => [
        ...current,
        {
          messageId: crypto.randomUUID(),
          chatId,
          userId,
          text: "Not connected to chat server",
          createdAt: new Date().toISOString(),
        },
      ]);
      return;
    }

    try {
      await connectionRef.current.invoke(
        "SendMessage",
        chatId,
        currentUserId,
        trimedMessage
      );
      setMessage("");
    } catch (error) {
      console.error("Misslyckades att skicka meddelande:", error);
    }
  };

  return {
    currentUser: currentUserId,
    isConnected,
    messages,
    message,
    handleMessageChange,
    sendMessage,
  };
};
