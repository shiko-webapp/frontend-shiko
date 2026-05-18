import { postData } from "@/src/services/serviceBase/serviceBase";
import { ICourse } from "../../courses/models/ICourse";
import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";

export const createCourse = async (
  newCourse: ICreateCourseDto
): Promise<ICourse | null> => {
  try {
    const url = process.env.NEXT_PUBLIC_COURSE_API_URL || "";
    const course = await postData<ICreateCourseDto, ICourse>(url, newCourse);

    return course;
  } catch (error) {
    return null;
  }
};
