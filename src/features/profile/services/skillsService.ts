import { apiFetch } from "@/src/lib/apiFetch";
import { IUserSkill } from "../models/IUserSkill";

export const getUserSkills = async (): Promise<IUserSkill[]> => {
  const res = await apiFetch(`/api/profile/skills`);
  return res.json();
};