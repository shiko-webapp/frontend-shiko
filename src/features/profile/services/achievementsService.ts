import { apiFetch } from "@/src/lib/apiFetch";
import { IUserAchievement } from "../models/IUserAchievement";

export const getUserAchievements = async (): Promise<IUserAchievement[]> => {
  const res = await apiFetch(`/api/profile/achievements`);
  return res.json();
};
export const addUserAchievement = async (achievementName: string): Promise<IUserAchievement | null> => {
  const res = await apiFetch(`/api/profile/achievements`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ achievementName }),
  });
  
  if (res.status === 409) return null;
  return res.json();
};