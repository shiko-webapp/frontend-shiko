"use client";

import { MessageModal } from "@/src/components/modals/MessageModal";
import { ICreateCourseDto } from "@/src/features/admin-courses/Dtos/ICreateCourseDto";
import { IFaqDto } from "@/src/features/admin-courses/Dtos/IFaqDto";
import { CourseForm } from "@/src/features/admin-courses/components/CourseForm";
import { createCourse } from "@/src/features/admin-courses/services/CourseFormService";
import { Spinner } from "@/src/features/courses/components/Spinner";
import React, { useState } from "react";

export default function AdminCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseForm, setCourseForm] = useState<ICreateCourseDto>({
    title: "",
    numberOfLessons: "",
    durationInMinutes: "",
    imageUrl: "",
    description: "",
    keyPoints: [],
    userId: "244a3391-327d-4277-a266-3f91ea53d374",
  });
  const [faq, setFaq] = useState<IFaqDto[]>([]);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isError: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseCreated = await createCourse(courseForm);

      if (courseCreated) {
        setModal({
          isOpen: true,
          title: "Success!",
          message: "Course Created",
          isError: false,
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Something went wrong, try again later.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
      setCourseForm({
        title: "",
        numberOfLessons: "",
        durationInMinutes: "",
        imageUrl: "",
        description: "",
        keyPoints: [],
        userId: "244a3391-327d-4277-a266-3f91ea53d374",
      });
    }
  };

  const updateCourseField = (name: keyof ICreateCourseDto, value: any) => {
    setCourseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="bg-secondary-50 min-h-screen p-4 md:p-8 w-full relative">
      {isLoading ? (
        <Spinner message="Creating course..."></Spinner>
      ) : (
        <div className="w-full bg-background rounded-2xl p-6 md:p-10 shadow-sm border border-secondary-50">
          <h3 className="text-secondary-900 mb-2">Create New Course</h3>
          <p className="text-secondary-500 mb-8 text-small">
            Fill in the details below to publish a new course and add its
            related content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <CourseForm
              courseForm={courseForm}
              onFieldChange={updateCourseField}
            ></CourseForm>
            {/* <FaqSection faq={faq} setFaq={setFaq}></FaqSection> */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-full md:w-auto"
              >
                Publish Course
              </button>
            </div>
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
