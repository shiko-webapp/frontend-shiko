"use client";

import React, { useState } from "react";


import { postData } from "@/src/services/serviceBase/serviceBase";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const onClick = () => {
  
    const payload = {
      email: email,
      password: password,
    };
    const url = `${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/register`;  
    postData(url, payload);
  };

  return (
    <div className="flex h-screen w-screen bg-[#f5f5f7] p-4 gap-4">
          <RegisterForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onClick={onClick}/>
    </div>
  );
}
