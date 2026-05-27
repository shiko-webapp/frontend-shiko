import { apiFetch } from "@/src/lib/apiFetch";
import { IFileUpload } from "../models/IFileUpload";

export const uploadFile = async (file: File): Promise<IFileUpload> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiFetch(`/api/profile/filehandler`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}

export const deleteFile = async (fileName: string): Promise<void> => {
  await apiFetch(`/api/profile/filehandler`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ fileName }),
  });
};