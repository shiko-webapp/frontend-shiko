import { ICourse } from "../models/ICourse";

interface ICourseVideoProps {
  course: ICourse;
}

export const CourseVideo = ({ course }: ICourseVideoProps) => {
  return (
    <div className="relative aspect-video bg-gray-200 rounded-3xl overflow-hidden mb-8 shadow-sm">
      <img
        src={course.imageUrl}
        className="w-full h-full object-cover opacity-80"
        alt="Thumbnail"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl">
          ▶
        </div>
      </div>
    </div>
  );
};
