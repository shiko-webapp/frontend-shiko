"use client";

import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";

interface IDescriptionSectionProps {
  courseForm: ICreateCourseDto;
  onFieldChange: (name: keyof ICreateCourseDto, value: any) => void;
}

export const DescriptionSection = ({
  courseForm,
  onFieldChange,
}: IDescriptionSectionProps) => {
  // Vi läser värdet direkt från förälderns objekt
  const descriptionText = courseForm.description || "";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-small font-semibold text-secondary-900">
          Description
        </label>
        <span
          className={`text-xs ${
            descriptionText.length > 200
              ? "text-primary-300 font-bold"
              : "text-secondary-500"
          }`}
        >
          {descriptionText.length}/200 characters
        </span>
      </div>
      <textarea
        maxLength={200}
        value={descriptionText}
        // Skickar uppdateringen direkt till det samlade statet
        onChange={(e) => onFieldChange("description", e.target.value)}
        placeholder="Provide a short marketing summary under 200 characters..."
        rows={3}
        className="w-full px-4 py-3 bg-secondary-50 border border-secondary-50 rounded-lg text-[15px] text-secondary-900 focus:outline-none focus:border-primary-300 transition-colors resize-none"
      />
    </div>
  );
};
