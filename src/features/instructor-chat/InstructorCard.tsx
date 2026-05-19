"use client";

import React, { useState } from "react";
import { InstructorChat } from "./InstructorChat"; // Justera sökvägen till din chattfil

export interface IInstructor {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

const mockInstructor: IInstructor = {
  name: "Ahmed Ali",
  role: "Instructor",
  avatarUrl: "https://unsplash.com",
  bio: "Ahmed Ali is a digital marketer with hands-on experience in building and scaling brands across digital platforms. He specializes in creating data-informed marketing strategies that combine creativity with performance to deliver measurable growth.",
};

export const InstructorCard = () => {
  const instructor = mockInstructor;
  const [showChat, setShowChat] = useState(false);

  // Om användaren klickat på Chat-knappen, rendera chattkomponenten istället
  if (showChat) {
    return (
      <InstructorChat
        instructorName={instructor.name}
        onBack={() => setShowChat(false)}
      />
    );
  }

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Profilöversikt: Bild, Namn, Roll och Åtgärdsknappar */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Stor rund profilbild */}
        <img
          src={instructor.avatarUrl}
          alt={instructor.name}
          className="w-[100px] h-[100px] rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col items-center sm:items-start gap-4">
          {/* Namn och Roll */}
          <div className="text-center sm:text-left">
            <h4 className="text-secondary-900 font-bold leading-tight tracking-tight text-2xl sm:text-3xl">
              {instructor.name}
            </h4>
            <p className="text-sm font-medium text-[#94A3B8] mt-0.5">
              {instructor.role}
            </p>
          </div>

          {/* Kontakt- och Chatknappar enligt bild */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary-50 border border-gray-100 flex items-center justify-center text-secondary-500 hover:text-secondary-900 hover:bg-gray-100 transition-colors cursor-pointer text-sm">
              ✉
            </button>

            <button className="w-10 h-10 rounded-full bg-secondary-50 border border-gray-100 flex items-center justify-center text-secondary-500 hover:text-secondary-900 hover:bg-gray-100 transition-colors cursor-pointer text-sm">
              📞
            </button>

            {/* Klick på Chat ändrar tillståndet till true */}
            <button
              onClick={() => setShowChat(true)}
              className="btn btn-md btn-primary !rounded-full px-6 flex items-center gap-2"
            >
              <span className="text-base">💬</span>
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sektion för biografi */}
      <div className="pt-4 space-y-3">
        <h5 className="text-lg font-bold text-secondary-900">
          About Instructor
        </h5>
        <p className="text-[14px] font-normal text-[#94A3B8] leading-relaxed whitespace-pre-line">
          {instructor.bio}
        </p>
      </div>
    </div>
  );
};
