import { apiFetch } from "@/src/lib/apiFetch";
import { IProfile } from "../models/IProfile";

export const getProfile = async (): Promise<IProfile> => {
  const res = await apiFetch(`/api/profile`);
  return res.json();
};

export const updateProfile = async (profile: IProfile): Promise<IProfile> => {
  const res = await apiFetch(`/api/profile`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(profile),
  });
  return res.json();
};