import { apiFetch } from "@/src/lib/apiFetch";
import { IProfile } from "../models/IProfile";

export const getProfile = async (): Promise<IProfile> => {
  const res = await apiFetch(`/api/profile`);
  return res.json();
};