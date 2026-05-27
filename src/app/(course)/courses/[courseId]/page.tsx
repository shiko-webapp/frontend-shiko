import { CourseInfo } from "@/src/features/courses/components/CourseInfo";
import { CourseTabs } from "@/src/features/courses/components/CourseTabs";
import { CourseVideo } from "@/src/features/courses/components/CourseVideo";
import { getCourseById } from "@/src/features/courses/services/courseService";
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
  console.log("User: ", user);
  const instructor = await getUserById(course.userId);

  const privateChatId = `${course.userId}_${user.id}`;

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
