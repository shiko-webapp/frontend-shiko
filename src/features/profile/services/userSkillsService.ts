import { apiFetch } from "@/src/lib/apiFetch";
import { IUserSkill } from "../models/IUserSkill";

export const getUserSkills = async (): Promise<IUserSkill[]> => {
  const res = await apiFetch(`/api/profile/userskills`);
  return res.json();
};

export const addUserSkill = async (skillId: number): Promise<IUserSkill> => {
  const res = await apiFetch(`/api/profile/userskills`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ skillId }),
  });
  return res.json();
};

export const removeUserSkill = async (id: number): Promise<void> => {
  await apiFetch(`/api/profile/userskills`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};