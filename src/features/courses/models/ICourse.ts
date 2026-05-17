export interface ICourse {
  id: string;
  title: string;
  imageUrl: string;
  ratingScore: number;
  numberOfLessons: number;
  durationInMinutes: number;
  description: string | null;
  keyPoints: string[];
  userId: string;
}
