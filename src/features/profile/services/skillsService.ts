import { apiFetch } from "@/src/lib/apiFetch";
import { ISkill } from "../models/ISkill";

export const getSkills = async (): Promise<ISkill[]> => {
  const res = await apiFetch(`/api/profile/skills`);
  return res.json();
};