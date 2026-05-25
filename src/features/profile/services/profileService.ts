import { apiFetch } from "@/src/lib/apiFetch";
import { IProfile } from "../models/IProfile";

export interface IUpdateProfileRequest {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  description: string | null;
  profileImageUrl: string | null;
}

export const getProfile = async (): Promise<IProfile> => {
  const res = await apiFetch(`/api/profile`);
  return res.json();
};

export const updateProfile = async (request: IUpdateProfileRequest): Promise<IProfile> => {
  const res = await apiFetch(`/api/profile`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  });
  return res.json();
};