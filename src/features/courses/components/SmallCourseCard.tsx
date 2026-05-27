import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPopularCourse } from "../models/IPopularCourse";
import Link from "next/link";

interface ICourseCardProps {
  course: IPopularCourse;
}
export const SmallCourseCard = ({ course }: ICourseCardProps) => {
  return (
    <div
      key={course.courseId}
      className="flex items-center justify-between p-4 bg-white border border-secondary-50 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="overflow-hidden">
          <div className="text-sm md:text-base font-bold text-foreground leading-tight truncate">
            {course.title}
          </div>
        </div>
      </div>
      <Link
        href={`/courses/${course.courseId}`}
        aria-label={`View ${course.title}`}
        className="shrink-0 p-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-secondary-900 text-white rounded-full group-hover:bg-primary-500 transition-colors cursor-pointer ml-2"
      >
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          className="text-[9px] md:text-[10px]"
        />
      </Link>
    </div>
  );
};
