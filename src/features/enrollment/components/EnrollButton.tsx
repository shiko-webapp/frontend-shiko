"use client";

import { useState } from "react";
import { applyForEnrollment } from "../services/enrollmentsClientService";

interface EnrollButtonProps {
  courseId: string;
  instructorId: string;
}

export const EnrollButton = ({ courseId, instructorId }: EnrollButtonProps) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleEnroll = async () => {
    setStatus("loading");

    const success = await applyForEnrollment({ courseId, instructorId });

    if (success) {
      setStatus("success");
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold p-4 rounded-xl text-center mb-6 animate-pulse">
        ⏳ Application Sent! Waiting for instructor approval.
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        type="button"
        disabled={status === "loading"}
        onClick={handleEnroll}
        className={`w-full btn btn-lg text-white font-bold p-4 rounded-xl transition-all shadow-sm ${
          status === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 cursor-pointer"
        }`}
      >
        {status === "loading"
          ? "Processing application..."
          : "Apply for Course"}
      </button>
      {status === "error" && (
        <p className="text-red-600 text-xs mt-2 text-center font-medium">
          Something went wrong. You might already have a pending application.
        </p>
      )}
    </div>
  );
};
