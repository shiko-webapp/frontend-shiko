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