import {
  faPalette,
  faBezierCurve,
  faLayerGroup,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { ICourse } from "../models/ICourse";
import { SmallCourseCard } from "./SmallCourseCard";

export const PopularCourses = () => {
  const popularCategories: ICourse[] = [
    {
      id: 1,
      title: "Graphic Design",
      subTitle: "Creating Visual Content",
      user: "",
      rating: "",
      lessons: 2,
      duration: "",
      image: "",
      icon: faPalette,
    },
    {
      id: 2,
      title: "UI/UX Design",
      subTitle: "Complex User Interface",
      user: "",
      rating: "",
      lessons: 2,
      duration: "",
      image: "",
      icon: faBezierCurve,
    },
    {
      id: 3,
      title: "Brand Identity",
      subTitle: "Collection of Visual",
      user: "",
      rating: "",
      lessons: 2,
      duration: "",
      image: "",
      icon: faLayerGroup,
    },
    {
      id: 4,
      title: "Web Design",
      subTitle: "Creating Websites",
      user: "",
      rating: "",
      lessons: 2,
      duration: "",
      image: "",
      icon: faGlobe,
    },
  ];
  return (
    <section className="mb-12 md:mb-16">
      <h5 className="mb-6 md:mb-8 text-foreground text-xl md:text-2xl">
        Popular This Week
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {popularCategories.map((course) => (
          <SmallCourseCard course={course} key={course.id}></SmallCourseCard>
        ))}
      </div>
    </section>
  );
};
