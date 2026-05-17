export interface IProfile {
  id: number;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  description: string | null;
  profileImageUrl: string | null;
}