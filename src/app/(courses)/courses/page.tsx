import { PopularCourses } from "@/src/features/courses/components/PopularCourses";
import { ICourse } from "@/src/features/courses/models/ICourse";
import { CourseCard } from "@/src/features/courses/components/CourseCard";
import { faBezierCurve } from "@fortawesome/free-solid-svg-icons";

export default function Courses() {
  const allCourses: ICourse[] = [
    {
      id: 1,
      title: "Artificial Intelligence",
      sub: "",
      author: "Samantha William",
      rating: "5.0",
      lessons: 15,
      duration: "22h 30min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      sub: "",
      author: "Kevin Hope",
      rating: "4.7",
      lessons: 25,
      duration: "35h 20min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
    {
      id: 3,
      title: "Digital Marketing",
      sub: "",
      author: "Jannat Sally",
      rating: "5.0",
      lessons: 8,
      duration: "12h 10min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
    {
      id: 4,
      title: "UI/UX Design for Beginner",
      sub: "",
      author: "Johnny Ahmed",
      rating: "5.0",
      lessons: 18,
      duration: "27h 50min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
    {
      id: 5,
      title: "Full stack Developer",
      sub: "",
      author: "Hasan Mahmud",
      rating: "4.7",
      lessons: 32,
      duration: "45h 45min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
    {
      id: 6,
      title: "Sketch for Designer",
      sub: "",
      author: "Jannat Lila",
      rating: "4.9",
      lessons: 12,
      duration: "18h 25min",
      image: "https://unsplash.com",
      icon: faBezierCurve,
    },
  ];

  return (
    <article className="min-h-screen bg-background font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <PopularCourses></PopularCourses>
        <section>
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h5 className="text-foreground text-xl md:text-2xl">All Courses</h5>
            <button className="text-primary-300 font-bold text-sm md:text-base hover:text-primary-500 transition-colors cursor-pointer">
              See All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
            {allCourses.map((course) => (
              <CourseCard course={course} key={course.id}></CourseCard>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
