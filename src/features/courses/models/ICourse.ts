export interface ICourse {
  id: string; // Ändrad från number till string (eftersom C# använder Guid)
  title: string;
  imageUrl: string;
  ratingScore: number; // Ändrad från string till number (eftersom C# använder double)
  numberOfLessons: number;
  durationInMinutes: number; // Ändrad från string till number (eftersom C# använder int)
  description: string | null; // Tillagd (nullable sträng från din C#-uppdatering)
  keyPoints: string[]; // Tillagd (din nya lista med strängar)
  userId: string;
}
