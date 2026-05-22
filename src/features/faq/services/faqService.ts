
import { getData, postData } from "@/src/services/serviceBase/serviceBase";
import { IFaq } from "../models/IFaq";
import { IFaqDto } from "../../admin-courses/Dtos/IFaqDto";

export const getAllFaqs = async (courseId: string): Promise<IFaq[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_FAQ_API_URL;
    const faqs = await getData<IFaq[]>(`${url}/${courseId}` || "");

    return faqs;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const createFaqs = async (
  courseId: string,
  newFaqs: IFaqDto[]
): Promise<IFaq[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_FAQ_API_URL;
    const faqs = await postData<IFaqDto[], IFaq[]>(
      `${url}/${courseId}` || "",
      newFaqs
    );

    return faqs;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
