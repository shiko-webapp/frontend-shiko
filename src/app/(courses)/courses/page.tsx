"use client";
import { PopularCourses } from "@/src/features/courses/components/PopularCourses";
import { ICourse } from "@/src/features/courses/models/ICourse";
import { CourseCard } from "@/src/features/courses/components/CourseCard";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/src/features/courses/services/courseService";
import { Spinner } from "@/src/features/courses/components/Spinner";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCoursesAsync = async () => {
      setIsLoading(true);
      try {
        const allCourses = await getAllCourses();
        setCourses(allCourses);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getCoursesAsync();
  }, []);

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
          {isLoading ? (
            <Spinner message="Laddar kurser..."></Spinner>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 animate-in fade-in duration-500">
              {courses.map((course) => (
                <CourseCard course={course} key={course.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
