"use client";
import { useState } from "react";
import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";

interface IKeyPointsSectionProps {
  courseForm: ICreateCourseDto;
  onFieldChange: (name: keyof ICreateCourseDto, value: any) => void;
}

export const KeyPointsSection = ({
  courseForm,
  onFieldChange,
}: IKeyPointsSectionProps) => {
  const [newKeyPoint, setNewKeyPoint] = useState("");

  const handleAddKeyPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyPoint.trim() === "") return;
    const updatedPoints = [...courseForm.keyPoints, newKeyPoint.trim()];
    onFieldChange("keyPoints", updatedPoints);
    setNewKeyPoint("");
  };

  const handleRemoveKeyPoint = (indexToRemove: number) => {
    const updatedPoints = courseForm.keyPoints.filter(
      (_, index) => index !== indexToRemove
    );
    onFieldChange("keyPoints", updatedPoints);
  };

  return (
    <div className="p-5 bg-secondary-50 rounded-xl border border-secondary-50/50 space-y-4">
      <label className="text-small font-semibold text-secondary-900 block">
        Key Points (What you will learn)
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={newKeyPoint}
          onChange={(e) => setNewKeyPoint(e.target.value)}
          placeholder="e.g., Master statistical analysis and predictive modeling"
          className="flex-1 px-4 py-2 bg-background border border-secondary-50 rounded-lg text-sm text-secondary-900 focus:outline-none focus:border-primary-300"
        />
        <button
          type="button"
          onClick={handleAddKeyPoint}
          className="btn btn-sm btn-secondary"
        >
          + Add Point
        </button>
      </div>

      {courseForm?.keyPoints && courseForm.keyPoints.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
          {courseForm.keyPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-background px-4 py-2 rounded-md border border-secondary-50/30 text-sm text-secondary-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary-300 font-bold">✓</span>
                <span>{point}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveKeyPoint(index)}
                className="text-primary-300 hover:text-primary-500 text-xs font-semibold cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
