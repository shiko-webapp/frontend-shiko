"use client";

import React, { useState } from "react";

import AuthLayout from "../../components/(auth)/AuthLayout";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import { postData } from "@/src/services/serviceBase/serviceBase";
import { useAuth } from "@/src/context/AuthContext";

type LoginResponse = {
  accessToken: string,
  expiresAt: string,
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nextStep, setNextStep] = useState(false);
  const { setAccessToken} = useAuth();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    const url = `${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/login`;
    console.log(url);
    const response: LoginResponse = await postData(url, payload);
  
    setAccessToken(response.accessToken);
    
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
