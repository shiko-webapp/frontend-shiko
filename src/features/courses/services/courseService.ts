import { getData } from "@/src/services/serviceBase/serviceBase";
import { ICourse } from "../models/ICourse";

export const getAllCourses = async (): Promise<ICourse[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_COURSE_API_URL;
    const courses = await getData<ICourse[]>(url || "");

    console.log("data", courses);

    return courses;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getCourseById = async (id: string): Promise<ICourse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_COURSE_API_URL;
    const course = await getData<ICourse>(`${baseUrl}/${id}`);

    return course;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
