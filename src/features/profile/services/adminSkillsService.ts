import { apiFetch } from "@/src/lib/apiFetch";
import { ISkill } from "../models/ISkill";

export const createSkill = async (skillName: string): Promise<ISkill> => {
  const res = await apiFetch(`/api/profile/skills`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ skillName }),
  });
  return res.json();
};

export const deleteSkill = async (id: number): Promise<void> => {
  await apiFetch(`/api/profile/skills`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};