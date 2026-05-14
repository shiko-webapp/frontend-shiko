import { CourseInfo } from "@/src/features/courses/components/CourseInfo";
import { CourseTabs } from "@/src/features/courses/components/CourseTabs";
import { CourseVideo } from "@/src/features/courses/components/CourseVideo";
import { getCourseById } from "@/src/features/courses/services/courseService";

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Kursen hittades inte</h1>
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
              keyPoints={course.keyPoints}
            />
          </section>
        </div>
      </div>
    </article>
  );
}
