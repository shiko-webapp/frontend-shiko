import {
  PutDataAsync,
  deleteData,
  postData,
} from "@/src/services/serviceBase/serviceBase";
import { ICourse } from "../../courses/models/ICourse";
import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";
import { IUpdateCourseDto } from "../Dtos/IUpdateCourseDto";

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

export const updateCourse = async (
  courseId: string,
  formData: ICreateCourseDto
): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_COURSE_API_URL || "";
    const payload: IUpdateCourseDto = {
      id: courseId,
      title: formData.title,
      numberOfLessons: Number(formData.numberOfLessons),
      durationInMinutes: Number(formData.durationInMinutes),
      imageUrl: formData.imageUrl,
      description: formData.description,
      keyPoints: formData.keyPoints,
    };
    const url = `${baseUrl}/${courseId}`;

    await PutDataAsync<IUpdateCourseDto, void>(url, payload);

    return true;
  } catch (error) {
    console.error("Failed to update course via PutDataAsync:", error);
    return false;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_COURSE_API_URL || "";
    const deleted = await deleteData(`${url}/${courseId}`);
    return true;
  } catch (error) {
    return false;
  }
};
