"use client";

import { useState } from "react";
import { IFaq } from "../../faq/models/IFaq";

interface CourseTabsProps {
  description: string | null;
  keyPoints: string[];
  faqs: IFaq[];
}

export function CourseTabs({ description, keyPoints, faqs }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "faqs">("overview");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="mt-8">
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#1E293B] text-white"
              : "bg-[#F1F5F9] text-[#94A3B8] hover:text-[#1E293B]"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
            activeTab === "faqs"
              ? "bg-[#1E293B] text-white"
              : "bg-[#F1F5F9] text-[#94A3B8] hover:text-[#1E293B]"
          }`}
        >
          FAQs
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">About</h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed whitespace-pre-line">
                {description || "No description available for this course."}
              </p>
            </div>

            {keyPoints && keyPoints.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                  Key Point
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-[14px] text-[#64748B]"
                    >
                      <span className="text-[#F97316] font-semibold text-base select-none">
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "faqs" && (
          <div className="space-y-4">
            {!faqs || faqs.length === 0 ? (
              <p className="text-sm text-[#64748B]">No FAQ available.</p>
            ) : (
              faqs.map((faq, index) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100/50 transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="flex items-center justify-between w-full text-left font-semibold text-[#0F172A] text-base md:text-lg focus:outline-none"
                    >
                      <span>
                        {index + 1}. {faq.question}
                      </span>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F1F5F9] text-[#94A3B8] text-xl font-light select-none transition-transform duration-200 cursor-pointer">
                        {isOpen ? "−" : "+"}
                      </div>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm md:text-[15px] text-[#94A3B8] leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
}
