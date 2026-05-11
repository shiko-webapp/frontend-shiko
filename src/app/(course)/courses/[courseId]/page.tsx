import { CourseInfo } from "@/src/features/courses/components/CourseInfo";
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

            <div className="flex gap-8 border-b border-gray-200 mb-8">
              <button
                className={`pb-4 text-sm font-medium ${"text-[#1D2939] border-b-2 border-[#1D2939]"}`}
              >
                Ovweview
              </button>
              <button
                className={`pb-4 text-sm font-medium ${"text-[#1D2939] border-b-2 border-[#1D2939]"}`}
              >
                FAQ
              </button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
