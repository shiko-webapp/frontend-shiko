"use client";

import { InstructorChat } from "@/src/features/instructor-chat/components/InstructorChat";
import { useState } from "react";

interface ICourseMock {
  id: string;
  title: string;
  numberOfLessons: number;
  durationInMinutes: number;
  imageUrl: string;
}

interface IActiveChatMock {
  chatId: string;
  studentId: string;
  studentName: string;
  lastMessageText: string;
  lastMessageAt: string;
}

const mockCourses: ICourseMock[] = [
  {
    id: "c90cbfd3-145b-4a80-a24f-5a782d53969d",
    title: "Artificial Intelligence",
    numberOfLessons: 15,
    durationInMinutes: 60,
    imageUrl: "/docs",
  },
  {
    id: "c966fcac-20fa-4fc5-897c-a7fa4a1dcf15",
    title: "Data Science & Analytics",
    numberOfLessons: 25,
    durationInMinutes: 80,
    imageUrl: "/docs",
  },
];

const mockActiveChats: IActiveChatMock[] = [
  {
    chatId: "244a3391-327d-4277-a266-3f91ea53d374_student111",
    studentId: "student111",
    studentName: "Hasan Mahmud",
    lastMessageText: "Hi Ahmed! I had a quick question about module 2...",
    lastMessageAt: "10:32 AM",
  },
  {
    chatId: "244a3391-327d-4277-a266-3f91ea53d374_student222",
    studentId: "student222",
    studentName: "Emma Watson",
    lastMessageText: "Thanks for the feedback on my last assignment!",
    lastMessageAt: "Yesterday",
  },
];

export default function AdminCourses() {
  const [courses] = useState<ICourseMock[]>(mockCourses);
  const [activeChats] = useState<IActiveChatMock[]>(mockActiveChats);

  const [selectedChat, setSelectedChat] = useState<IActiveChatMock | null>(
    null
  );

  return (
    <main className="bg-secondary-50 min-h-screen p-4 md:p-8 w-full font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h3 className="text-secondary-900 font-bold">Instructor Dashboard</h3>
          <p className="text-secondary-500 text-small">
            Manage your published courses and interact with your students live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <section className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-lg font-bold text-secondary-900">
                My Courses ({courses.length})
              </h5>
              <button className="btn btn-sm btn-primary rounded-full!">
                + Create Course
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-background rounded-2xl p-5 border border-secondary-50/50 shadow-xs flex flex-col justify-between min-h-35"
                >
                  <div>
                    <h5 className="text-base font-bold text-secondary-900 leading-tight mb-2">
                      {course.title}
                    </h5>
                    <div className="flex gap-4 text-xs text-secondary-500 font-medium">
                      <span>📖 {course.numberOfLessons} Lessons</span>
                      <span>⏱ {course.durationInMinutes} min</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-secondary-50/30 flex justify-between items-center mt-4">
                    <span className="text-[11px] font-mono text-secondary-500 truncate max-w-37.5">
                      ID: {course.id.slice(0, 8)}...
                    </span>
                    <button className="text-xs font-bold text-primary-300 hover:text-primary-500 transition-colors cursor-pointer">
                      Edit Course →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HÖGER SPALT: Studentchattar (tar upp 1/3 av skärmen) */}
          <section className="space-y-4">
            <h5 className="text-lg font-bold text-secondary-900">
              Student Chats
            </h5>

            {selectedChat ? (
              /* Om en chatt är klickad, visa chattfönstret */
              <InstructorChat
                chatId={selectedChat.chatId}
                userName={selectedChat.studentName} // Studentens namn
                userId={selectedChat.studentId} // Studentens ID
                instructorName="Ahmed Ali" // Instruktörens namn (Hårdkodat tills vidare)
                onBack={() => setSelectedChat(null)}
              />
            ) : (
              /* Annars visas inkorgslistan över alla elever */
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
                      {/* Generisk cirkel-avatar för studenten */}
                      <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center font-bold text-secondary-900 shrink-0 border border-secondary-50">
                        {chat.studentName.charAt(0)}
                      </div>

                      {/* Meddelandetext och namn */}
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
        </div>
      </div>
    </main>
  );
}
