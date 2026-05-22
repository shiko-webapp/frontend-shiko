"use client";

import React, { useState } from "react";

import AuthLayout from "../../components/(auth)/AuthLayout";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import { apiFetch } from "@/src/lib/apiFetch";



export default function LoginPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_TEST_USER || "");
  const [password, setPassword] = useState(
    process.env.NEXT_PUBLIC_TEST_PASSWORD || "",
  );
  const [nextStep, setNextStep] = useState(false);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    try {
      const response = await apiFetch("/api/auth/login",{
      method: "POST",
      credentials: "include", // 👈 IMPORTANT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    } );

      console.log(response)

      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#f5f5f7] p-4 gap-4">
      <AuthLayout>
        {!nextStep && (
          <EmailForm
            email={email}
            setEmail={setEmail}
            setNextStep={setNextStep}
          />
        )}
        {nextStep && (
          <PasswordForm
            email={email}
            password={password}
            setPassword={setPassword}
            onClick={onClick}
          />
        )}
      </AuthLayout>
    </div>
  );
}
