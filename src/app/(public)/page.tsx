import { requireUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { IUser } from "../(course)/courses/[courseId]/page";
import Link from "next/link";
import { getUserById } from "@/src/features/instructor-chat/services/userService";
import { getAllCourses } from "@/src/features/courses/services/courseService";
import { getLiveClassesServer } from "@/src/features/live/services/liveClassService";

export default async function Home() {
  const user: IUser = await requireUser();
  const userInfo = await getUserById(user.id);
  const courses = await getAllCourses();
  const liveClasses = await getLiveClassesServer();

  if (!user) redirect("/login");

  return (
    <main className="bg-secondary-50 min-h-screen p-4 md:p-8 w-full font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-secondary-900 font-bold">
              Welcome back, {userInfo.firstName}!
            </h4>
            <p className="text-secondary-500 text-small mt-1">
              Here is an overview of your learning platform.
            </p>
          </div>

          {user.role === "Instructor" && (
            <Link
              href="/instructor-dashboard"
              className="btn btn-md btn-primary rounded-full! shadow-xs self-start sm:self-auto"
            >
              🛠 My Courses
            </Link>
          )}
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/courses"
              className="bg-background rounded-2xl p-6 border border-secondary-50/50 flex flex-col justify-between shadow-xs min-h-40 transition-all hover:shadow-md cursor-pointer"
            >
              <div className="space-y-1">
                {/* Liten dämpad cirkel med ikon likt bilden */}
                <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center text-secondary-500 mb-4 text-lg">
                  📖
                </div>
                <h5 className="text-secondary-500 text-small uppercase tracking-wider font-semibold">
                  Total Courses
                </h5>
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <span className="text-4xl font-extrabold text-secondary-900 leading-none">
                  {courses.length}
                </span>
                <span className="text-xs font-semibold text-primary-300 hover:text-primary-500 transition-colors cursor-pointer flex items-center gap-1">
                  View Details →
                </span>
              </div>
            </Link>

            <Link
              href="/live"
              className="bg-background rounded-2xl p-6 border border-secondary-50/50 flex flex-col justify-between shadow-xs min-h-40 transition-all hover:shadow-md"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-full bg-tertiary-50 flex items-center justify-center text-tertiary-500 mb-4 text-lg">
                  📺
                </div>
                <h5 className="text-secondary-500 text-small uppercase tracking-wider font-semibold">
                  Live Classes
                </h5>
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <span className="text-4xl font-extrabold text-secondary-900 leading-none">
                  {liveClasses.length}
                </span>
                <span className="text-xs font-semibold text-primary-300 hover:text-primary-500 transition-colors cursor-pointer flex items-center gap-1">
                  View Details →
                </span>
              </div>
            </Link>
          </div>

          <Link
            href="/profile"
            className="bg-background rounded-2xl p-6 border border-secondary-50/50 shadow-xs flex flex-col items-center justify-center text-center space-y-4"
          >
            {/* Användar-avatar med fallbacksfärger baserad på ditt tema */}
            <div className="w-20 h-20 rounded-full bg-secondary-50 border-2 border-secondary-50 flex items-center justify-center text-2xl font-bold text-secondary-900 shadow-inner">
              {userInfo.firstName
                ? userInfo.firstName.charAt(0).toUpperCase()
                : "U"}
            </div>

            {/* Kolumn-data för Namn och Roll */}
            <div className="space-y-1 w-full">
              <div className="border-b border-secondary-50/50 pb-2">
                <span className="text-xs uppercase tracking-wider text-secondary-500 font-semibold block">
                  Name
                </span>
                <p className="text-base font-bold text-secondary-900 truncate">
                  {user.email || "N/A"}
                </p>
              </div>
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-secondary-500 font-semibold block">
                  Role
                </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${user.role === "Instructor"
                      ? "bg-primary-50 text-primary-500"
                      : "bg-tertiary-50 text-tertiary-500"
                    }`}
                >
                  {user.role || "Student"}
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
