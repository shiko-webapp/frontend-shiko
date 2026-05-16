import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICourse } from "../models/ICourse";
import { IPopulaarCourse } from "../models/IPopularCourse";

interface ICourseCardProps {
  course: IPopulaarCourse;
}
export const SmallCourseCard = ({ course }: ICourseCardProps) => {
  return (
    <div
      key={course.id}
      className="flex items-center justify-between p-4 bg-white border border-secondary-50 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 p-2 h-10 md:w-12 md:h-12 flex items-center justify-center bg-secondary-50 rounded-xl text-secondary-500 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
          <FontAwesomeIcon icon={course.icon} className="text-lg md:text-xl" />
        </div>
        <div className="overflow-hidden">
          <div className="text-sm md:text-base font-bold text-foreground leading-tight truncate">
            {course.title}
          </div>
          <div className="text-[11px] md:text-xs text-secondary-500 mt-1 truncate">
            {course.subTitle}
          </div>
        </div>
      </div>
      <div className="shrink-0 p-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-secondary-900 text-white rounded-full group-hover:bg-primary-500 transition-colors cursor-pointer ml-2">
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          className="text-[9px] md:text-[10px]"
        />
      </div>
    </div>
  );
};
