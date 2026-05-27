"use client";

import React, { useState } from "react";
import { CourseForm } from "@/src/features/instructor-courses/components/CourseForm";
import { MessageModal } from "@/src/components/modals/MessageModal";
import { Spinner } from "@/src/features/courses/components/Spinner";
import { ICreateCourseDto } from "@/src/features/instructor-courses/Dtos/ICreateCourseDto";
import { IFaqDto } from "@/src/features/instructor-courses/Dtos/IFaqDto";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/src/features/instructor-courses/services/CourseFormService";
import { FaqSection } from "../../instructor-courses/components/FaqSection";
import { createFaqs } from "../../faq/services/faqService";

interface CourseFormManagerProps {
  instructorId: string;
  initialCourse: any | null;
}

export default function CourseFormManager({
  instructorId,
  initialCourse,
}: CourseFormManagerProps) {
  const isEditMode = !!initialCourse;
  const [isLoading, setIsLoading] = useState(false);

  const [courseForm, setCourseForm] = useState<ICreateCourseDto>({
    title: initialCourse?.title || "",
    numberOfLessons: initialCourse?.numberOfLessons?.toString() || "",
    durationInMinutes: initialCourse?.durationInMinutes?.toString() || "",
    imageUrl: initialCourse?.imageUrl || "",
    description: initialCourse?.description || "",
    keyPoints: initialCourse?.keyPoints || [],
    userId: instructorId,
  });

  const [faq, setFaq] = useState<IFaqDto[]>([]);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode) {
        const isUpdated = await updateCourse(initialCourse.id, courseForm);

        if (!isUpdated && faq.length <= 0) {
          throw new Error("Update failed");
        }
        if (faq.length > 0) {
          await createFaqs(initialCourse.id, faq);
        }
      } else {
        await createCourse(courseForm);
      }

      setModal({
        isOpen: true,
        title: "Success!",
        message: isEditMode
          ? "Course updated successfully"
          : "Course created successfully",
        isError: false,
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Something went wrong, try again later.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourseField = (name: keyof ICreateCourseDto, value: any) => {
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handledelete = async () => {
    await deleteCourse(initialCourse.id);
  };

  return (
    <main className="bg-secondary-50 min-h-screen p-4 md:p-8 w-full relative font-sans">
      {isLoading ? (
        <Spinner
          message={isEditMode ? "Updating course..." : "Creating course..."}
        />
      ) : (
        <div className="w-full bg-background rounded-2xl p-6 md:p-10 shadow-sm border border-secondary-50">
          <h3 className="text-secondary-900 mb-2">
            {isEditMode
              ? `Edit Course: ${initialCourse.title}`
              : "Create New Course"}
          </h3>
          <p className="text-secondary-500 mb-8 text-small">
            {isEditMode
              ? "Update the fields below to modify your course."
              : "Fill in the details below to publish a new course."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 mb-8">
            <CourseForm
              courseForm={courseForm}
              onFieldChange={updateCourseField}
            />
            <FaqSection faq={faq} setFaq={setFaq}></FaqSection>
            <section className={`${isEditMode && "flex justify-between"}`}>
              {isEditMode && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handledelete}
                    className="btn btn-lg bg-red-400 w-full md:w-auto"
                  >
                    Remove course
                  </button>
                </div>
              )}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary w-full md:w-auto"
                >
                  {isEditMode ? "Save Changes" : "Publish Course"}
                </button>
              </div>
            </section>
          </form>
        </div>
      )}

      {modal.isOpen && (
        <MessageModal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          isError={modal.isError}
          onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </main>
  );
}
