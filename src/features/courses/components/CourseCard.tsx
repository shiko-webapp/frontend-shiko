import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICourse } from "../models/ICourse";
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { CourseCardRating } from "./CourseCardRating";

interface ICourseCardProps {
  course: ICourse;
}

export const CourseCard = ({ course }: ICourseCardProps) => {
  return (
    <section
      key={course.id}
      className="bg-white rounded-4xl md:rounded-[2.5rem] overflow-hidden border border-secondary-50 shadow-sm hover:shadow-xl transition-all flex flex-col h-[80%] group cursor-pointer"
    >
      <div className="relative h-48 sm:h-52 md:h-60 w-full p-3 md:p-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-3xl md:rounded-4xl"
        />
      </div>

      <section className="p-5 md:p-8 pt-2 flex flex-col grow">
        <h4 className="text-lg md:text-[22px] font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary-500 transition-colors line-clamp-2">
          {course.title}
        </h4>
        <CourseCardRating course={course}></CourseCardRating>
        <hr className="border-secondary-50 mb-4 md:mb-6" />
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mt-auto gap-4">
          <div className="flex gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-secondary-500 font-bold whitespace-nowrap">
              <FontAwesomeIcon icon={faBookOpen} className="opacity-70" />
              {course.lessons} Lessons
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-secondary-500 font-bold whitespace-nowrap">
              <FontAwesomeIcon icon={faClock} className="opacity-70" />
              {course.duration}
            </div>
          </div>

          <button className="btn btn-sm btn-primary rounded-xl! w-full xl:w-auto px-4 md:px-5 py-2 flex items-center justify-center gap-2 text-xs md:text-sm">
            View Details
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[9px] md:text-[10px]"
            />
          </button>
        </div>
      </section>
    </section>
  );
};
