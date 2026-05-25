import { apiFetch } from "@/src/lib/apiFetch";
import { IUserAchievement } from "../models/IUserAchievement";

export const getUserAchievements = async (): Promise<IUserAchievement[]> => {
  const res = await apiFetch(`/api/profile/achievements`);
  return res.json();
};
export const addUserAchievement = async (achievementName: string): Promise<IUserAchievement> => {
  const res = await apiFetch(`/api/profile/achievements`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ achievementName }),
  });
  return res.json();
};