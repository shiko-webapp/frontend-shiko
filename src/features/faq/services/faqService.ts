import { getData, postData } from "@/src/services/serviceBase/serviceBase";
import { IFaq } from "../models/IFaq";
import { IFaqDto } from "../../instructor-courses/Dtos/IFaqDto";

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
): Promise<any> => {
  try {
    const url = process.env.NEXT_PUBLIC_FAQ_API_URL || "";
    const fullUrl = `${url}/${courseId}`;

    // Vi sätter TResponse till any så att serviceBase inte kraschar när den möter C#-objektet
    const faqs = await postData<IFaqDto[], any>(fullUrl, newFaqs);

    return faqs;
  } catch (error) {
    console.error("Error creating FAQs:", error);
    return null;
  }
};
