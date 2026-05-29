import { getData } from "@/src/services/serviceBase/serviceBase";
import { IActiveChat } from "../models/IActiveChat";

export const getChatsByInstructorId = async (
  instructorId: string
): Promise<IActiveChat[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_INSTRUCTOR_API_URL || "";
    const chats = getData<IActiveChat[]>(`${url}/all/${instructorId}`);
    return chats;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
