import { getData, postData } from "@/src/services/serviceBase/serviceBase";
import { IPopularCoursesResponse } from "../models/IPopularCourse";

const BASE_URL = process.env.NEXT_PUBLIC_POPULAR_COURSES_API_URL;

export const popularCourseService = {
    async getPopular(take: number = 4): Promise<IPopularCoursesResponse> {
       return getData<IPopularCoursesResponse>(`${BASE_URL}/api/popular-courses?take=${take}`);
    },

    async trackView(courseId: string): Promise<void> {
    return postData<{ courseId: string }, void>(
      `${BASE_URL}/api/track-view`,
      { courseId }
    );
  },
}