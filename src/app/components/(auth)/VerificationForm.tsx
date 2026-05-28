"use client";

import { useState, useRef, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import { handleNextStep } from "@/src/lib/auth/handleNextStep";
import { useRouter } from "next/navigation";

export default function VerificationForm() {
  const [otp, setOtp] = useState<string[]>(Array(7).fill(""));
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const verifyOtp = async () => {
    const attemptId = sessionStorage.getItem("attemptId");
    const code = otp.join("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attemptId,
          code,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("OTP verification failed");
    }
    const data = await res.json();
    console.log(data);

    if (data.nextStep) handleNextStep(data.nextStep, router, data);
    
    return data;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...otp];
    newCode[index] = value;
    setOtp(newCode);
    if (value && index < 6) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 7);
    const newCode = [...otp];
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
    });
    setOtp(newCode);
    inputs.current[Math.min(pasted.length, 6)]?.focus();
  };
  // const handleOnClick = async (e) => {
  //     fetch("POST", "/api/auth/send-verification-code",{headers:{"Content-Type": "applicatoin/json"}, body: {}})
  // }
  return (
    <AuthLayout>
      <h1 className="text-[38px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
        Verification Needed
      </h1>
      <p className="text-sm text-gray-500 mb-8 max-w-[320px]">
        Please verify your account with the verification code that has been sent
        to your specified email address.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Enter verification code
        </label>
        <div className="flex gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`w-10 h-11 text-center text-sm font-semibold border rounded-lg outline-none transition-all duration-200
                ${digit ? "border-gray-300 text-gray-900" : "border-gray-200 text-gray-400"}
                focus:border-[#E8472A] focus:shadow-[0_0_0_3px_rgba(232,71,42,0.08)]`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">
            {timer > 0
              ? `New code can be sent in ${timer} sec`
              : "You can now resend the code"}
          </span>
          <button
            onClick={() => setTimer(15)}
            className={`text-xs font-medium transition-opacity ${timer > 0 ? "text-gray-300 pointer-events-none" : "text-[#E8472A] hover:opacity-75"}`}
          >
            Resend verification code
          </button>
        </div>
      </div>

      <button
        className="w-full py-3.5 bg-[#E8472A] hover:bg-[#d13d22] active:scale-[0.99] text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
        onClick={verifyOtp}
      >
        Continue
      </button>
    </AuthLayout>
  );
}
