"use client";

import React, { useState } from "react";

import AuthLayout from "../../components/(auth)/AuthLayout";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import { postData } from "@/src/services/serviceBase/serviceBase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nextStep, setNextStep] = useState(false);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    const url = `${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}login`;
    console.log(url);
    postData(url, payload);
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
