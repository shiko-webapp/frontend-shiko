import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export async function beginLoginFlow(email: string, router: Router) {
  const res = await fetch("/api/auth/begin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  switch (data.nextStep) {
    case "Verification":
      router.push("/verify-email");
      break;

    case "CompleteProfile":
      router.push("/complete-profile");
      break;

    case "Password":
      router.push("/login/password");
      break;

    case "Register":
      router.push("/register");
      break;
  }

  return data;
}
