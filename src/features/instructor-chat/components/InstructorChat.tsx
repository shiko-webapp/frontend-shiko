"use client";

import { useChat } from "../hooks/useChat";

interface InstructorChatProps {
  chatId: string;
  userName: string;
  userId: string;
  instructorName: string;
  currentUserId: string;
  onBack: () => void;
}

export const InstructorChat = ({
  chatId,
  userName,
  userId,
  instructorName,
  currentUserId,
  onBack,
}: InstructorChatProps) => {
  const {
    currentUser,
    isConnected,
    messages,
    message,
    handleMessageChange,
    sendMessage,
  } = useChat({ chatId, userId: currentUserId });

  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <section className="w-full bg-background border border-secondary-50 rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans">
      <div className="bg-secondary-50 px-5 py-4 border-b border-secondary-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? "bg-quaternary-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <div>
            <h5 className="text-base font-bold text-secondary-900 leading-tight">
              {currentUserId === userId ? instructorName : userName}
            </h5>
            <span className="text-[11px] text-secondary-500 font-medium">
              {isConnected ? "Active now" : "Connecting to chat..."}
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-semibold text-secondary-500 hover:text-secondary-900 cursor-pointer transition-colors"
        >
          {currentUserId === userId ? "← Back to profile" : "← Back to inbox"}
        </button>
      </div>

      <div className="p-5 h-87.5 overflow-y-auto space-y-4 bg-[#FAFAFA]">
        {messages.map((msg) => {
          const isMe = msg.userId === currentUserId;
          const isStudentMessage = msg.userId === userId;

          return (
            <div
              key={msg.messageId}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="text-[11px] text-gray-400 mb-0.5 px-1">
                {isStudentMessage ? userName : instructorName}
              </span>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-xs ${
                  isMe
                    ? "bg-primary-500 text-white rounded-tr-none"
                    : "bg-white border border-gray-100 text-secondary-900 rounded-tl-none"
                }`}
              >
                <p className="font-normal">{msg.text}</p>
              </div>

              <span className="text-[10px] text-secondary-500 mt-1 px-1 font-medium">
                {formatTime(msg.createdAt)}
              </span>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-secondary-50 bg-background flex gap-3 items-center"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder={
            currentUserId === userId
              ? `Write a message to ${instructorName}...`
              : `Write a message to ${userName}...`
          }
          disabled={!isConnected}
          className="flex-1 px-4 py-2.5 bg-secondary-50 border border-secondary-50 rounded-full text-sm text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!isConnected}
          className="btn btn-sm btn-secondary rounded-full! px-5 h-9.5 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  );
};
