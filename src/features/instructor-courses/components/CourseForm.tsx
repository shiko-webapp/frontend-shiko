import { useState } from "react";
import { DescriptionSection } from "./DescriptionSection";
import { ICreateCourseDto } from "../Dtos/ICreateCourseDto";
import { KeyPointsSection } from "./KeyPointsSection";
import { uploadFile } from "../../profile/services/fileHandlerService";
// Justera sökvägen till där din uploadFile-funktion ligger

interface ICourseFormProps {
  courseForm: ICreateCourseDto;
  onFieldChange: (name: keyof ICreateCourseDto, value: any) => void;
}

export const CourseForm = ({ courseForm, onFieldChange }: ICourseFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Nytt state för laddningsindikator

  // Gjorde funktionen asynkron (async)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsUploading(true); // Starta laddnings-animering

      try {
        // 1. Skicka filen till ditt filehandler-API över nätverket
        const response = await uploadFile(file);

        // 2. Spara den returnerade URL:en direkt i förälderns courseForm-state!
        // (Beroende på ditt IFileUpload-interface, läs response.url eller response.fileUrl)
        onFieldChange("imageUrl", response.fileUrl);

        console.log(
          "Image successfully stored in Azure Blob Storage:",
          response
        );
      } catch (error) {
        console.error("File upload crashed:", error);
        alert("Kunde inte ladda upp bilden till lagringsserver, försök igen.");
      } finally {
        setIsUploading(false); // Stäng av laddnings-animering
      }
    }
  };

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              disabled={isUploading} // Inaktivera input under uppladdning
            />
            <label
              htmlFor="course-image-upload"
              className={`btn btn-md btn-secondary w-full cursor-pointer flex items-center justify-center gap-2 ${
                isUploading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* Dynamisk text på knappen baserat på om den laddar upp */}
              {isUploading
                ? "⏳ Uploading Image..."
                : selectedFile
                ? `📁 ${selectedFile.name}`
                : "Choose Image File"}
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <DescriptionSection
        courseForm={courseForm}
        onFieldChange={onFieldChange}
      />
      <KeyPointsSection courseForm={courseForm} onFieldChange={onFieldChange} />
    </section>
  );
};
