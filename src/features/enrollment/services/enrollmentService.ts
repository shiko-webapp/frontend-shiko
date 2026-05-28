import { IPendingEnrollmentsDto } from "../Dtos/IPendingEnrollmentsDto";
import { cookies } from "next/headers";
import axios from "axios";

const getCookieHeader = async (): Promise<string> => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("accessToken");
    return tokenCookie ? `accessToken=${tokenCookie.value}` : "";
  } catch {
    return "";
  }
};

export const getPendingEnrollments = async (): Promise<
  IPendingEnrollmentsDto[]
> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ENROLLMENT_API_URL || "";
    const url = `${baseUrl}/instructor/pending`;

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("accessToken");
    const cookieHeader = tokenCookie ? `accessToken=${tokenCookie.value}` : "";

    const response = await axios.get<IPendingEnrollmentsDto[]>(url, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error("Failed to get pending enrollments", error);
    return [];
  }
};

export interface IEnrollmentStatusDto {
  status: "None" | "Pending" | "Approved" | "Rejected";
  isAllowedAccess: boolean;
  enrollmentId?: string;
}

export const checkEnrollmentStatus = async (
  courseId: string
): Promise<IEnrollmentStatusDto> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ENROLLMENT_API_URL || "";
    const url = `${baseUrl}/status?courseId=${courseId}`;
    const cookieHeader = await getCookieHeader();

    const response = await axios.get<IEnrollmentStatusDto>(url, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data || { status: "None", isAllowedAccess: false };
  } catch (error) {
    console.error(
      `Failed to check enrollment status for course ${courseId}`,
      error
    );
    return { status: "None", isAllowedAccess: false };
  }
};
