import { apiFetch } from "@/src/lib/apiFetch";
import { IUserAchievement } from "../models/IUserAchievement";

export const getUserAchievements = async (): Promise<IUserAchievement[]> => {
  const res = await apiFetch(`/api/profile/achievements`);
  return res.json();
};