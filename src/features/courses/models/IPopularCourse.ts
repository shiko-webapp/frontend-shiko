import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IPopularCourse {
  courseId: string;
  title: string;
  description: string;
  imageUrl: string;
  viewCount: number;
}

export interface IPopularCoursesResponse {
  data: IPopularCourse[];
  weekStart: string;
  generatedAt: string;
}