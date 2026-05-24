import Link from "next/link";
import React, { useState } from "react";

type EmailFormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function EmailForm({
  email,
  setEmail,
  onClick
}: EmailFormProps) {
  const [focused, setFocused] = useState(false);

  // const emailExists = (email: string) => email !== "" && setNextStep(true);

  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-2xl">
      <div className="w-full max-w-100 px-10">
        <h1 className="text-[42px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
          Welcome
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Please log in to your account to continue.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div
            className={`flex items-center gap-2.5 border rounded-xl px-4 py-3 transition-all duration-200 ${
              focused
                ? "border-[#E8472A] shadow-[0_0_0_3px_rgba(232,71,42,0.08)]"
                : "border-gray-200"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <circle cx="8" cy="6" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
              <path
                d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="email"
              placeholder="Type your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
            />
          </div>
          <div className="flex justify-end mt-2">
            <a
              href="#"
              className="text-xs text-[#E8472A] font-medium hover:opacity-75 transition-opacity"
            >
              Forgot your email address?
            </a>
          </div>
        </div>

        {/* Login Next Step */}
        <button
          className="w-full py-3.5 bg-[#E8472A] hover:bg-[#d13d22] active:scale-[0.99] text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
          onClick={onClick}
        >
          Continue
        </button>

        {/* Footer links */}
        <div className="mt-6 flex flex-col items-center gap-3">

          <div className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#E8472A] hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center gap-3 my-7">
                        <span className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">or continue with</span>
                        <span className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button className="w-full py-3.5 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2.5 transition-all duration-200">
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <rect x="0" y="0" width="8" height="8" fill="#F25022" />
                            <rect x="10" y="0" width="8" height="8" fill="#7FBA00" />
                            <rect x="0" y="10" width="8" height="8" fill="#00A4EF" />
                            <rect x="10" y="10" width="8" height="8" fill="#FFB900" />
                        </svg>
                        Work or school account
                    </button> */}
      </div>
    </div>
  );
}
