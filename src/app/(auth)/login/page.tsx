"use client";

import React, { useReducer, useState } from "react";

import AuthLayout from "../../components/(auth)/AuthLayout";
import EmailForm from "./components/EmailForm";
import { beginLoginFlow } from "@/src/lib/auth/authFlow";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_TEST_USER || "");
  // const [password, setPassword] = useState(
  //   process.env.NEXT_PUBLIC_TEST_PASSWORD || "",
  // );
  const [nextStep, setNextStep] = useState(false);
  const router = useRouter();
  

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    try {
      const response = beginLoginFlow(email,router)

      console.log(response);

      //window.location.href = "/";
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
            onClick={onClick}
          />
        )}
        {/* {nextStep && (
          <PasswordForm
            email={email}
            password={password}
            setPassword={setPassword}
            onClick={onClick}
          />
        )} */}
      </AuthLayout>
    </div>
  );
}
