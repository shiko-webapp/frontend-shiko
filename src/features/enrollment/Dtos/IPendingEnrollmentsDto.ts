export interface IPendingEnrollmentsDto {
  enrollmentId: string; // Ändrat från id
  courseId: string;
  userId: string; // Ändrat från studentId
  firstName: string; // Nytt!
  lastName: string; // Nytt!
  phoneNumber?: string;
  description?: string;
  profileImageUrl?: string; // Nytt!
  appliedAt: string;
}
