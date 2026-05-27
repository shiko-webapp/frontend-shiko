"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICourse } from "../models/ICourse";
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { CourseCardRating } from "./CourseCardRating";
import { useRouter } from "next/navigation";

interface ICourseCardProps {
  course: ICourse;
}

export const CourseCard = ({ course }: ICourseCardProps) => {
  const router = useRouter();
  const hasValidImage =
    course.imageUrl &&
    course.imageUrl !== "/docs" &&
    !course.imageUrl.startsWith("/docs");

  return (
    <section
      key={course.id}
      className="bg-white rounded-4xl md:rounded-[2.5rem] overflow-hidden border border-secondary-50 shadow-sm hover:shadow-xl transition-all flex flex-col h-full group cursor-pointer"
    >
      {hasValidImage && (
        <div className="relative h-48 sm:h-52 md:h-56 w-full p-3 md:p-4 pb-0 md:pb-0 shrink-0">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover rounded-3xl md:rounded-4xl"
          />
        </div>
      )}

      <section className="p-5 md:p-8 pt-4 flex flex-col flex-1 justify-between">
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-lg md:text-[22px] font-bold text-foreground group-hover:text-primary-500 transition-colors line-clamp-2">
            {course.title}
          </h4>
          <CourseCardRating course={course} />
        </div>

        <div className="mt-4 md:mt-6">
          <hr className="border-secondary-50 mb-4 md:mb-6" />
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex gap-3 md:gap-4">
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-secondary-500 font-bold whitespace-nowrap">
                <FontAwesomeIcon icon={faBookOpen} className="opacity-70" />
                {course.numberOfLessons} Lessons
              </div>
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-secondary-500 font-bold whitespace-nowrap">
                <FontAwesomeIcon icon={faClock} className="opacity-70" />
                {course.durationInMinutes} min
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`courses/${course.id}`);
              }}
              className="btn btn-sm btn-primary rounded-xl! w-full xl:w-auto px-4 md:px-5 py-2 flex items-center justify-center gap-2 text-xs md:text-sm shrink-0"
            >
              View Details
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[9px] md:text-[10px]"
              />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
