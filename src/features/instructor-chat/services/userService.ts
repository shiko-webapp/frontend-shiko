import { getData } from "@/src/services/serviceBase/serviceBase";
import { IProfile } from "../../profile/models/IProfile";

export const getUserById = async (userId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const user = await getData<IProfile>(`${url}/api/profile/${userId}`);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
