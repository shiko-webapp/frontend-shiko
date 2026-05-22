import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICourse } from "../models/ICourse";

interface ICourseCardProps {
  course: ICourse;
}
export const CourseCardRating = ({ course }: ICourseCardProps) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-2">
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
        <img
          src={`https://ui-avatars.com{course.author}&background=f9ccc8&color=b13f25`}
          alt={course.userId}
        />
      </div>
      <span className="text-xs md:text-sm text-secondary-500 truncate">
        {course.userId}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        <FontAwesomeIcon
          icon={faStar}
          className="text-primary-300 text-[10px] md:text-xs"
        />
        <span className="text-xs md:text-sm font-bold">
          {course.ratingScore}
        </span>
      </div>
    </div>
  );
};
