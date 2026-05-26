"use client";

import { ICourse } from "../../courses/models/ICourse";

interface ICourseCardEditProps {
  course: ICourse;
}
export const CourseCardEdit = ({ course }: ICourseCardEditProps) => {
  return (
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
  );
};
