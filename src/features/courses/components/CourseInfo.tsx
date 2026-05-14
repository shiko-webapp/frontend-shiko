interface ICourseInfoProps {
  lessons: number;
  duration: number;
  raiting: number;
}
export const CourseInfo = ({
  lessons,
  duration,
  raiting,
}: ICourseInfoProps) => {
  return (
    <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">
      <span className="flex items-center gap-2">📚 {lessons} Lessons</span>
      <span className="flex items-center gap-2">⏱️ {duration}</span>
      <span className="flex items-center gap-2 text-orange-500">
        ⭐ {raiting} (264 reviews)
      </span>
    </div>
  );
};
