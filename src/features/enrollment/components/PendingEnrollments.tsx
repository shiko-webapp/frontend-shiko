"use client";

import { useState } from "react";
import { IPendingEnrollmentsDto } from "../Dtos/IPendingEnrollmentsDto";
import { respondToEnrollment } from "../services/enrollmentsClientService";
import { MessageModal } from "@/src/components/modals/MessageModal";

interface IPendingEnrollmentsProps {
  initialEnrollments: IPendingEnrollmentsDto[];
}

export const PendingEnrollments = ({
  initialEnrollments,
}: IPendingEnrollmentsProps) => {
  const [enrollments, setEnrollments] =
    useState<IPendingEnrollmentsDto[]>(initialEnrollments);

  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
  });

  const handleAction = async (enrollmentId: string, approve: boolean) => {
    console.log(enrollmentId + approve);

    setIsProcessing(enrollmentId);
    try {
      const success = await respondToEnrollment(enrollmentId, approve);

      if (success) {
        setEnrollments((prev) =>
          prev.filter((item) => item.enrollmentId !== enrollmentId)
        );
        setModal({
          isOpen: true,
          title: "Success!",
          message: approve
            ? "The student has been successfully enrolled in the course."
            : "The application has been declined.",
          isError: false,
        });
      } else {
        setModal({
          isOpen: true,
          title: "Action Failed",
          message:
            "Could not update the application status. Please try again later.",
          isError: true,
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Network Error",
        message: "Something went wrong. Please check your internet connection.",
        isError: true,
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <section className="space-y-4">
      <h5 className="text-lg font-bold text-secondary-900">
        Course Applications
      </h5>

      <div className="bg-background rounded-2xl border border-secondary-50/50 shadow-xs overflow-hidden">
        <div className="p-4 bg-secondary-50/50 border-b border-secondary-50/50">
          <span className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
            Pending Approval ({enrollments.length})
          </span>
        </div>

        <div className="divide-y divide-secondary-50/30 max-h-112.5 overflow-y-auto">
          {enrollments.length === 0 ? (
            <div className="p-8 text-center text-xs text-secondary-500 font-medium">
              No pending course applications.
            </div>
          ) : (
            enrollments.map((item) => {
              const isUnknown = item.firstName === "Unknown";
              const displayName = isUnknown
                ? `Student (...${item.userId.substring(0, 5)})`
                : `${item.firstName} ${item.lastName}`;

              return (
                <div
                  key={item.enrollmentId}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-secondary-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.profileImageUrl || "https://pravatar.cc"}
                      alt={displayName}
                      className="w-10 h-10 rounded-full shrink-0 border border-secondary-50 object-cover"
                    />

                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[14px] font-bold text-secondary-900 truncate">
                        {displayName}
                      </p>
                      <p className="text-[10px] text-secondary-500 font-medium">
                        Applied: {new Date(item.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isProcessing == item.enrollmentId ? (
                      <span className="text-[10px] text-secondary-400 font-bold animate-pulse px-2">
                        Processing...
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAction(item.enrollmentId, false)}
                          className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer border border-red-100/50"
                          title="Reject student"
                        >
                          ✕
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAction(item.enrollmentId, true)}
                          className="w-8 h-8 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer border border-green-100/50"
                          title="Approve student"
                        >
                          ✓
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <MessageModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        isError={modal.isError}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
};
