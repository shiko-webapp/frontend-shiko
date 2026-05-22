import { useState } from "react";
import { DescriptionSection } from "./DescriptionSection";
import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";
import { KeyPointsSection } from "./KeyPointsSection";

interface ICourseFormProps {
  courseForm: ICreateCourseDto;
  onFieldChange: (name: keyof ICreateCourseDto, value: any) => void;
}

export const CourseForm = ({ courseForm, onFieldChange }: ICourseFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFieldChange("imageUrl", `/images/${file.name}`);
    }
  };

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Title */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <label className="text-small font-semibold text-secondary-900">
            Course Title
          </label>
          <input
            type="text"
            value={courseForm.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="e.g., Artificial Intelligence"
            required
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-50 rounded-lg text-[15px] text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors"
          />
        </div>

        {/* Image File Selector Button */}
        <div className="flex flex-col gap-2">
          <label className="text-small font-semibold text-secondary-900">
            Course Image
          </label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="course-image-upload"
            />
            <label
              htmlFor="course-image-upload"
              className="btn btn-md btn-secondary w-full cursor-pointer flex items-center justify-center gap-2"
            >
              📁 {selectedFile ? selectedFile.name : "Choose Image File"}
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Number of Lessons */}
        <div className="flex flex-col gap-2">
          <label className="text-small font-semibold text-secondary-900">
            Number of Lessons
          </label>
          <input
            type="number"
            min="0"
            value={courseForm.numberOfLessons}
            onChange={(e) => onFieldChange("numberOfLessons", e.target.value)}
            placeholder="e.g., 15"
            required
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-50 rounded-lg text-[15px] text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors"
          />
        </div>

        {/* Duration (Minutes) */}
        <div className="flex flex-col gap-2">
          <label className="text-small font-semibold text-secondary-900">
            Duration (Minutes)
          </label>
          <input
            type="number"
            min="0"
            value={courseForm.durationInMinutes}
            onChange={(e) => onFieldChange("durationInMinutes", e.target.value)}
            placeholder="e.g., 60"
            required
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-50 rounded-lg text-[15px] text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors"
          />
        </div>
      </div>

      {/* Skicka vidare propsen till din DescriptionSection om den också behöver uppdatera statet */}
      <DescriptionSection
        courseForm={courseForm}
        onFieldChange={onFieldChange}
      />
      <KeyPointsSection
        courseForm={courseForm}
        onFieldChange={onFieldChange}
      ></KeyPointsSection>
    </section>
  );
};
