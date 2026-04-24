import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ICourse {
  id: number;
  title: string;
  sub: string;
  author: string;
  rating: string;
  lessons: number;
  duration: string;
  image: string;
  icon: IconDefinition;
}
