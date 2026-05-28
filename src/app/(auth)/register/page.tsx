"use client";

import { useState } from "react";

import { postData } from "@/src/services/serviceBase/serviceBase";
import RegisterForm from "./components/RegisterForm";
import { useRouter } from "next/navigation";
import { AuthNextStep, handleNextStep } from "@/src/lib/auth/handleNextStep";
type RegisterRequest = {
  email: string;
  password: string;
};
type RegisterResponse = {
  success: boolean;
  nextStep: AuthNextStep;
  attemptId?: string;
};
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClick = async () => {
    const payload = {
      email: email,
      password: password,
    };
    const url = `${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/auth/register`;
    const data = await postData<RegisterRequest, RegisterResponse>(
      url,
      payload,
    );
    console.log(data)
    handleNextStep(data.nextStep, router, data);
  };

  return (
    <div className="flex h-screen w-screen bg-[#f5f5f7] p-4 gap-4">
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClick={onClick}
      />
    </div>
  );
}
