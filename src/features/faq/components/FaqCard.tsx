"use client";

import { useState } from "react";
import { IFaq } from "../models/IFaq";

interface IFaqCardProps {
  faqs: IFaq[];
}
export const FaqCard = ({ faqs }: IFaqCardProps) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
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
  );
};
