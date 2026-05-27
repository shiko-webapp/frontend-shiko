import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICourse } from "../models/ICourse";
import { getUserById } from "../../instructor-chat/services/userService";
import { useEffect, useState } from "react";
import { IProfile } from "../../profile/models/IProfile";

interface ICourseCardProps {
  course: ICourse;
}

export const CourseCardRating = ({ course }: ICourseCardProps) => {
  const [instructor, setInstructor] = useState<IProfile>();

  useEffect(() => {
    const getInstructor = async () => {
      const fetchedInstructor = await getUserById(course.userId);
      console.log(fetchedInstructor);

      setInstructor(fetchedInstructor);
    };
    getInstructor();
  }, []);
  const displayName = instructor
    ? `${instructor.firstName} ${instructor.lastName}`
    : "Instructor";
  const avatarUrl =
    instructor?.profileImageUrl ||
    `https://ui-avatars.com{encodeURIComponent(displayName)}&background=f9ccc8&color=b13f25`;

  return (
    <div className="flex items-center gap-2 md:gap-3 mb-2">
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs md:text-sm text-secondary-500 truncate">
        {instructor?.firstName}
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
