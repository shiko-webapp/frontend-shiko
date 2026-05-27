import { CourseInfo } from "@/src/features/courses/components/CourseInfo";
import { CourseTabs } from "@/src/features/courses/components/CourseTabs";
import { CourseVideo } from "@/src/features/courses/components/CourseVideo";
import { getCourseById } from "@/src/features/courses/services/courseService";
import { EnrollButton } from "@/src/features/enrollment/components/EnrollButton";
import { checkEnrollmentStatus } from "@/src/features/enrollment/services/enrollmentService";
import { getAllFaqs } from "@/src/features/faq/services/faqService";
import { getUserById } from "@/src/features/instructor-chat/services/userService";
import { requireUser } from "@/src/lib/auth";
export interface IUser {
  id: string;
  email: string;
  role: "Student" | "Admin" | "Instructor" | string;
  permissions: string[];
}

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const faqs = await getAllFaqs(courseId);

  const user: IUser = await requireUser();
  const instructor = await getUserById(course.userId);

  const privateChatId = `${course.userId}_${user.id}`;
  const enrollment = await checkEnrollmentStatus(courseId);

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">No active course avalible</h1>
      </div>
    );
  }

  return (
    <article className="bg-[#F9FAFB] min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          Courses <span className="mx-2">»</span>{" "}
          <span className="text-gray-900 font-medium">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <CourseVideo course={course}></CourseVideo>
            {user.role == "Student" && (
              <>
                {enrollment.status === "None" && (
                  <EnrollButton
                    courseId={courseId}
                    instructorId={course.userId}
                  />
                )}

                {enrollment.status === "Pending" && (
                  <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold p-4 rounded-xl text-center mb-6">
                    ⏳ Application Pending. The instructor needs to approve your
                    request before you can access the material.
                  </div>
                )}

                {enrollment.status === "Rejected" && (
                  <div className="w-full bg-red-50 border border-red-200 text-red-800 text-sm font-semibold p-4 rounded-xl text-center mb-6">
                    ✕ Your application for this course was declined.
                  </div>
                )}

                {enrollment.status === "Approved" && (
                  <div className="w-full bg-green-50 border border-green-200 text-green-800 text-sm font-semibold p-4 rounded-xl text-center mb-6">
                    ✓ You are enrolled! You have full access to all lectures and
                    chats.
                  </div>
                )}
              </>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-[#1D2939] mb-4">
              {course.title}
            </h1>
            <CourseInfo
              lessons={course.numberOfLessons}
              duration={course.durationInMinutes}
              raiting={course.ratingScore}
            ></CourseInfo>

            <CourseTabs
              description={course.description}
              userName={user.email}
              userId={user.id}
              chatId={privateChatId}
              role={user.role}
              instructor={instructor}
              keyPoints={course.keyPoints}
              faqs={faqs}
            />
          </section>
        </div>
      </div>
    </article>
  );
}
