"use client";

import { useEffect, useState } from "react";
import { popularCourseService } from "../services/popularCoursesService";
import { SmallCourseCard } from "./SmallCourseCard";
import { IPopularCourse } from "../models/IPopularCourse";

export const PopularCourses = () => {
  const [courses, setCourses] = useState<IPopularCourse[]>([]);

  useEffect(() => {
    popularCourseService.getPopular(4)
      .then(res => setCourses(res.data))
      .catch(err => console.error("Failed to fetch popular courses", err));
  }, []);

  return (
    <section className="mb-12 md:mb-16">
      <h5 className="mb-6 md:mb-8 text-foreground text-xl md:text-2xl">
        Popular This Week
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {courses.map((course) => (
          <SmallCourseCard course={course} key={course.courseId}></SmallCourseCard>
        ))}
      </div>
    </section>
  );
};
