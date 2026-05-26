"use client";

import { useState } from "react";
import { InstructorChat } from "./InstructorChat";
import { IProfile } from "../../profile/models/IProfile";

export interface IInstructor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImageUrl: string;
  description: string;
}

interface IInstructorCardProps {
  userName: string;
  userId: string;
  chatId: string;
  instructor: IProfile;
}

export const InstructorCard = ({
  userName,
  userId,
  chatId,
  instructor,
}: IInstructorCardProps) => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <InstructorChat
        chatId={chatId}
        userName={userName}
        userId={userId}
        currentUserId={userId}
        instructorName={instructor.firstName || "Unknown"}
        onBack={() => setShowChat(false)}
      />
    );
  }

  return (
    <section className="w-full space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          src={instructor.profileImageUrl || "/"}
          alt={instructor.firstName || " "}
          className="w-25 h-25 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-secondary-900 font-bold leading-tight tracking-tight text-2xl sm:text-3xl">
              {instructor.firstName} - {instructor.lastName}
            </h4>
            <p className="text-sm font-medium text-[#94A3B8] mt-0.5">
              Instructor
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary-50 border border-gray-100 flex items-center justify-center text-secondary-500 hover:text-secondary-900 hover:bg-gray-100 transition-colors cursor-pointer text-sm">
              ✉
            </button>

            <button className="w-10 h-10 rounded-full bg-secondary-50 border border-gray-100 flex items-center justify-center text-secondary-500 hover:text-secondary-900 hover:bg-gray-100 transition-colors cursor-pointer text-sm">
              📞
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="btn btn-md btn-primary rounded-full! px-6 flex items-center gap-2"
            >
              <span className="text-base">💬</span>
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <h5 className="text-lg font-bold text-secondary-900">
          About Instructor
        </h5>
        <p className="text-[14px] font-normal text-[#94A3B8] leading-relaxed whitespace-pre-line">
          {instructor.description}
        </p>
      </div>
    </section>
  );
};
