import { useRouter } from "next/navigation";
import { handleNextStep } from "./handleNextStep";

type Router = ReturnType<typeof useRouter>;

export async function beginLoginFlow(
  email: string,
  router: Router
) {
  const res = await fetch("/api/auth/begin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (data.nextStep === "Password") {
    sessionStorage.setItem("email", email);
  }

  handleNextStep(data.nextStep, router, data);

  return data;
}
