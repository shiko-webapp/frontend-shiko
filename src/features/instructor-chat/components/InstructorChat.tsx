"use client";

import React, { useState } from "react";

interface InstructorChatProps {
  instructorName: string;
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "student" | "instructor";
  timestamp: string;
}

export const InstructorChat = ({
  instructorName,
  onBack,
}: InstructorChatProps) => {
  const [typedMessage, setTypedMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi there! Thanks for enrolling in the course. Do you have any questions about the current module?`,
      sender: "instructor",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: `Hi Ahmed! Yes, I was wondering if we will cover advanced marketing analytics later in the course?`,
      sender: "student",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: `Absolutely! Module 5 is entirely dedicated to data-driven marketing, conversion tracking, and scaling campaigns using Google Analytics.`,
      sender: "instructor",
      timestamp: "10:35 AM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: typedMessage.trim(),
      sender: "student",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setTypedMessage("");
  };

  return (
    <section className="w-full bg-background border border-secondary-50 rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans">
      <div className="bg-secondary-50 px-5 py-4 border-b border-secondary-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-quaternary-500 animate-pulse"></div>
          <div>
            <h5 className="text-base font-bold text-secondary-900 leading-tight">
              {instructorName}
            </h5>
            <span className="text-[11px] text-secondary-500 font-medium">
              Active now
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-semibold text-secondary-500 hover:text-secondary-900 cursor-pointer transition-colors"
        >
          ← Back to profile
        </button>
      </div>
      <div className="p-5 h-87.5 overflow-y-auto space-y-4 bg-[#FAFAFA]">
        {messages.map((msg) => {
          const isStudent = msg.sender === "student";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isStudent ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-xs ${
                  isStudent
                    ? "bg-primary-500 text-white rounded-tr-none"
                    : "bg-white border border-gray-100 text-secondary-900 rounded-tl-none"
                }`}
              >
                <p className="font-normal">{msg.text}</p>
              </div>

              <span className="text-[10px] text-secondary-500 mt-1 px-1 font-medium">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
      </div>

      {/* Inmatningsfält och Skicka-knapp i botten */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-secondary-50 bg-background flex gap-3 items-center"
      >
        <input
          type="text"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder={`Write a message to ${instructorName}...`}
          className="flex-1 px-4 py-2.5 bg-secondary-50 border border-secondary-50 rounded-full text-sm text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors"
        />
        <button
          type="submit"
          className="btn btn-sm btn-secondary rounded-full! px-5 h-9.5"
        >
          Send
        </button>
      </form>
    </section>
  );
};
