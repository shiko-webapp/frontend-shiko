"use client";
import { useState } from "react";
import { IFaqDto } from "../Dtos/IFaqDto";

interface IFaqSectionProps {
  faq: IFaqDto[];
  setFaq: React.Dispatch<React.SetStateAction<IFaqDto[]>>;
}

export const FaqSection = ({ faq, setFaq }: IFaqSectionProps) => {
  // Endast textfälten stannar kvar lokalt
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (faqQuestion.trim() === "" || faqAnswer.trim() === "") return;

    // Uppdaterar arrayen i förälderns state
    setFaq((prev) => [
      ...prev,
      { question: faqQuestion.trim(), answer: faqAnswer.trim() },
    ]);

    setFaqQuestion("");
    setFaqAnswer("");
  };

  const handleRemoveFaq = (indexToRemove: number) => {
    // Tar bort via förälderns state
    setFaq((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-5 bg-secondary-50 rounded-xl border border-secondary-50/50 space-y-4">
      <label className="text-small font-semibold text-secondary-900 block">
        Course FAQs
      </label>

      <div className="space-y-3 bg-background p-4 rounded-lg border border-secondary-50/30">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={faqQuestion}
            onChange={(e) => setFaqQuestion(e.target.value)}
            placeholder="Question (e.g., Are there any prerequisites?)"
            className="w-full px-4 py-2 bg-secondary-50 border border-secondary-50 rounded-lg text-sm text-secondary-900 focus:outline-none focus:border-primary-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <textarea
            value={faqAnswer}
            onChange={(e) => setFaqAnswer(e.target.value)}
            placeholder="Answer text..."
            rows={2}
            className="w-full px-4 py-2 bg-secondary-50 border border-secondary-50 rounded-lg text-sm text-secondary-900 focus:outline-none focus:border-primary-300 resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddFaq}
            className="btn btn-sm btn-secondary"
          >
            + Add FAQ
          </button>
        </div>
      </div>

      {/* Läser listan direkt från proppen (faq) */}
      {faq && faq.length > 0 && (
        <div className="space-y-2 pt-2">
          {faq.map((item, index) => (
            <div
              key={index}
              className="bg-background p-4 rounded-lg border border-secondary-50/30 flex justify-between items-start gap-4"
            >
              <div className="text-sm space-y-1">
                <p className="font-semibold text-secondary-900">
                  {index + 1}. {item.question}
                </p>
                <p className="text-secondary-500 text-xs">{item.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFaq(index)}
                className="text-primary-300 hover:text-primary-500 text-xs font-semibold cursor-pointer shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
