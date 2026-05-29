export interface IUpdateCourseDto {
  id: string;
  title: string;
  numberOfLessons: number;
  durationInMinutes: number;
  imageUrl: string;
  description?: string;
  keyPoints?: string[];
}
