"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { IEnrollmentRequest } from "../Dtos/IEnrollmentRequest";
import { IEnrollmentResponse } from "../Dtos/IEnrollmentResponse";

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("accessToken");
  return tokenCookie ? `accessToken=${tokenCookie.value}` : "";
};

export const applyForEnrollment = async (
  enrollmentRequest: IEnrollmentRequest
): Promise<boolean> => {
  try {
    const url = process.env.NEXT_PUBLIC_ENROLLMENT_API_URL || "";
    const cookieHeader = await getCookieHeader();

    const response = await axios.post(url, enrollmentRequest, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.status === 201 || response.status === 200;
  } catch (error) {
    console.error("Failed to apply for course:", error);
    return false;
  }
};

export const respondToEnrollment = async (
  enrollmentId: string,
  approve: boolean
): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ENROLLMENT_API_URL || "";
    const url = `${baseUrl}/${enrollmentId}/respond`;

    const cookieHeader = await getCookieHeader();
    const body: IEnrollmentResponse = { approve };

    await axios.put(url, body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return true;
  } catch (error) {
    console.error(`Failed to respond to enrollment ${enrollmentId}`, error);
    return false;
  }
};
