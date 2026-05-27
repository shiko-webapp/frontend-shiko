import { getCoursesForInstructor } from "@/src/features/courses/services/courseService";

import { ChatOverview } from "@/src/features/instructor-overview/components/ChatOverview";
import { CourseCardEdit } from "@/src/features/instructor-overview/components/CourseCardEdit";
import { requireUser } from "@/src/lib/auth";
import { IUser } from "../../(course)/courses/[courseId]/page";
import { getChatsByInstructorId } from "@/src/features/instructor-chat/services/chatService";
import Link from "next/link";

export default async function InstructorDashboard() {
  const user: IUser = await requireUser();
  const courses = await getCoursesForInstructor(user.id);
  const activeChats = await getChatsByInstructorId(user.id);

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
              <Link
                href="/instructor-courses/create"
                className="btn btn-sm btn-primary rounded-full!"
              >
                + Create Course
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCardEdit
                  key={course.id}
                  course={course}
                ></CourseCardEdit>
              ))}
            </div>
          </section>
          <ChatOverview
            instructor={user}
            activeChats={activeChats}
          ></ChatOverview>
        </div>
      </div>
    </main>
  );
}
