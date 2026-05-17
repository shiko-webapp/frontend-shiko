import { getData } from "@/src/services/serviceBase/serviceBase";
import { IFaq } from "../models/IFaq";

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
