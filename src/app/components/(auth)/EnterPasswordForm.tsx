"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";

export default function EnterPasswordForm() {
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <AuthLayout>
            <h1 className="text-[38px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
                Enter Password
            </h1>
            <p className="text-sm text-gray-500 mb-10">
                Please enter your password to log in to your account.
            </p>

            {/* Email (read-only) */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                        <circle cx="8" cy="6" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-gray-500">hasan@gmail.com</span>
                </div>
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div
                    className={`flex items-center gap-2.5 border rounded-xl px-4 py-3 transition-all duration-200 ${focused
                            ? "border-[#E8472A] shadow-[0_0_0_3px_rgba(232,71,42,0.08)]"
                            : "border-gray-200"
                        }`}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                        <rect x="3" y="7" width="10" height="7" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
                        <path d="M5 7V5a3 3 0 016 0v2" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="border-none outline-none text-sm text-gray-900 w-full bg-transparent placeholder-gray-400"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                        {showPassword ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="#9CA3AF" strokeWidth="1.5" /><circle cx="8" cy="8" r="1.5" stroke="#9CA3AF" strokeWidth="1.5" /></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="#9CA3AF" strokeWidth="1.5" /><circle cx="8" cy="8" r="1.5" stroke="#9CA3AF" strokeWidth="1.5" /><line x1="2" y1="2" x2="14" y2="14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                            className="w-4 h-4 accent-[#E8472A] cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">Keep me logged in</span>
                    </label>
                    <a href="#" className="text-xs text-[#E8472A] font-medium hover:opacity-75 transition-opacity">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <button className="w-full mt-4 py-3.5 bg-[#E8472A] hover:bg-[#d13d22] active:scale-[0.99] text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200">
                Sign In
            </button>
        </AuthLayout>
    );
}