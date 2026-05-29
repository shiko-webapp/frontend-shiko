"use client";

import { useState } from "react";
import { InstructorChat } from "../../instructor-chat/components/InstructorChat";
import { IActiveChat } from "../../instructor-chat/models/IActiveChat";
import { IUser } from "@/src/app/(course)/courses/[courseId]/page";

interface IChatOverviewProps {
  instructor: IUser;
  activeChats: IActiveChat[];
}

export const ChatOverview = ({
  instructor,
  activeChats,
}: IChatOverviewProps) => {
  const [chats] = useState<IActiveChat[]>(activeChats);

  const [selectedChat, setSelectedChat] = useState<IActiveChat | null>(null);
  return (
    <section className="space-y-4">
      <h5 className="text-lg font-bold text-secondary-900">Student Chats</h5>

      {selectedChat ? (
        <InstructorChat
          chatId={selectedChat.chatId}
          userName={selectedChat.studentName}
          userId={selectedChat.studentId}
          instructorName={instructor.email}
          currentUserId={instructor.id}
          onBack={() => setSelectedChat(null)}
        />
      ) : (
        <div className="bg-background rounded-2xl border border-secondary-50/50 shadow-xs overflow-hidden">
          <div className="p-4 bg-secondary-50/50 border-b border-secondary-50/50">
            <span className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
              Recent Conversations
            </span>
          </div>

          <div className="divide-y divide-secondary-50/30 max-h-112.5 overflow-y-auto">
            {activeChats.map((chat) => (
              <button
                key={chat.chatId}
                onClick={() => setSelectedChat(chat)}
                className="w-full p-4 flex items-start gap-3 hover:bg-secondary-50 transition-colors text-left focus:outline-none cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center font-bold text-secondary-900 shrink-0 border border-secondary-50">
                  {chat.studentName.charAt(0)}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[14px] font-bold text-secondary-900 truncate">
                      {chat.studentName}
                    </p>
                    <span className="text-[10px] text-secondary-500 font-medium shrink-0">
                      {chat.lastMessageAt}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-500 truncate font-normal">
                    {chat.lastMessageText}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
