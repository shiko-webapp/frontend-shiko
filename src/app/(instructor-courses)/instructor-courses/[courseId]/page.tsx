import { requireUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { getCourseById } from "@/src/features/courses/services/courseService";
import CourseFormManager from "@/src/features/instructor-overview/components/CourseFormManager";

interface RouteParams {
  params: Promise<{ courseId: string }>;
}

export default async function CourseEditPage({ params }: RouteParams) {
  const user = await requireUser();
  console.log("User: ", user);

  if (!user || user.role !== "Instructor") redirect("/login");

  const { courseId } = await params;

  console.log("The params: ", courseId);

  if (courseId === "create") {
    return <CourseFormManager instructorId={user.id} initialCourse={null} />;
  }

  const existingCourse = await getCourseById(courseId).catch(() => null);
  console.log("The course:_ ", existingCourse);

  if (!existingCourse) {
    return (
      <div className="p-10 text-center">
        <h5 className="text-xl font-bold text-secondary-900">
          Kursen hittades inte
        </h5>
      </div>
    );
  }

  if (existingCourse.userId !== user.id) {
    redirect("/");
  }

  return (
    <CourseFormManager instructorId={user.id} initialCourse={existingCourse} />
  );
}
