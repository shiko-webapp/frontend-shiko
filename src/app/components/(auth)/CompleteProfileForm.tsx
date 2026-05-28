"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { handleNextStep } from "@/src/lib/auth/handleNextStep";
import { useRouter } from "next/navigation";

export default function CompleteProfileForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleOnClick = async () => {
    if (password === confirmPassword) {
      console.log("Passwords don't match");
      return;
    }

    const attemptId = sessionStorage.getItem("attemptId");

    if (!attemptId) {
      console.log("Missing attemptId");
      return;
    }

    const response = await fetch(
      "http://localhost:5039/auth/complete-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attemptId,
          password,
        }),
      },
    );

    const data = await response.json();
    console.log(data)
    handleNextStep(data.nextStep, router, data);
  };
  return (
    <AuthLayout>
      <h1 className="text-[38px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
        Almost There
      </h1>
      <p className="text-sm text-gray-500 mb-8 max-w-[340px]">
        Before you can sign in you need to verify your profile information and
        set a strong password. For security reasons, your password must be at
        least 8 characters long and include uppercase and lowercase letters,
        numbers, and special characters
      </p>

      {/* First Name */}
      {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#E8472A] focus-within:shadow-[0_0_0_3px_rgba(232,71,42,0.08)] transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                        <circle cx="8" cy="6" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Hasan"
                        className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
                    />
                </div>
            </div> */}

      {/* Last Name */}
      {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#E8472A] focus-within:shadow-[0_0_0_3px_rgba(232,71,42,0.08)] transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                        <circle cx="8" cy="6" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Mahmud"
                        className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
                    />
                </div>
            </div> */}

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#E8472A] focus-within:shadow-[0_0_0_3px_rgba(232,71,42,0.08)] transition-all duration-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0"
          >
            <rect
              x="3"
              y="7"
              width="10"
              height="7"
              rx="2"
              stroke="#9CA3AF"
              strokeWidth="1.5"
            />
            <path
              d="M5 7V5a3 3 0 016 0v2"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="2"
                  x2="14"
                  y2="14"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#E8472A] focus-within:shadow-[0_0_0_3px_rgba(232,71,42,0.08)] transition-all duration-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0"
          >
            <rect
              x="3"
              y="7"
              width="10"
              height="7"
              rx="2"
              stroke="#9CA3AF"
              strokeWidth="1.5"
            />
            <path
              d="M5 7V5a3 3 0 016 0v2"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••••"
            className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
          />
          <button
            onClick={() => setShowConfirm(!showConfirm)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          >
            {showConfirm ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="2"
                  x2="14"
                  y2="14"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 accent-[#E8472A] cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer">
          I agree with{" "}
          <a
            href="#"
            className="text-[#E8472A] font-medium hover:opacity-75 transition-opacity"
          >
            terms and conditions
          </a>
        </label>
      </div>

      <button
        className="w-full py-3.5 bg-[#E8472A] hover:bg-[#d13d22] active:scale-[0.99] text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
        onClick={handleOnClick}
      >
        Complete
      </button>
    </AuthLayout>
  );
}
