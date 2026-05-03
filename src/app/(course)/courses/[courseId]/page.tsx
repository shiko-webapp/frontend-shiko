import { CourseInfo } from "@/src/features/courses/components/CourseInfo";
import { CourseVideo } from "@/src/features/courses/components/CourseVideo";
import { ICourse } from "@/src/features/courses/models/ICourse";

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;

  const allCourses: ICourse[] = [
    {
      id: 1,
      title: "Artificial Intelligence",
      user: "Samantha William",
      rating: "5.0",
      lessons: 15,
      duration: "22h 30min",
      image: "https://unsplash.com",
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      user: "Kevin Hope",
      rating: "4.7",
      lessons: 25,
      duration: "35h 20min",
      image: "https://unsplash.com",
    },
    {
      id: 3,
      title: "Digital Marketing",
      user: "Jannat Sally",
      rating: "5.0",
      lessons: 8,
      duration: "12h 10min",
      image: "https://unsplash.com",
    },
    {
      id: 4,
      title: "UI/UX Design for Beginner",
      user: "Johnny Ahmed",
      rating: "5.0",
      lessons: 18,
      duration: "27h 50min",
      image: "https://unsplash.com",
    },
    {
      id: 5,
      title: "Full stack Developer",
      user: "Hasan Mahmud",
      rating: "4.7",
      lessons: 32,
      duration: "45h 45min",
      image: "https://unsplash.com",
    },
    {
      id: 6,
      title: "Sketch for Designer",
      user: "Jannat Lila",
      rating: "4.9",
      lessons: 12,
      duration: "18h 25min",
      image: "https://unsplash.com",
    },
  ];

  const course = allCourses.find((c) => c.id === Number(courseId));

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
              lessons={course.lessons}
              duration={course.duration}
              raiting={course.rating}
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
